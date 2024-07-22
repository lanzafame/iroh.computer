import os
import shutil
import iroh
import asyncio

from iroh import Iroh, SetTagOption, WrapOption, AddProgressType

class AddCallback:
    async def progress(self, event):
        t = event.type()
        if t == AddProgressType.FOUND:
            print("AddProgress - Found:")
            found = event.as_found()
            print(f"\tid: {found.id}, name: {found.name}, size: {found.size}")
        elif t == AddProgressType.PROGRESS:
            print("AddProgress - Progress:")
            progress = event.as_progress()
            print(f"\tid: {progress.id}, offset: {progress.offset}")
        elif t == AddProgressType.DONE:
            print("AddProgress - Done:")
            done = event.as_done()
            print(f"\tid: {done.id}, hash: {done.hash}")
        elif t == AddProgressType.ALL_DONE:
            print("AddProgress - AllDone:")
            all_done = event.as_all_done()
            print(f"\thash: {all_done.hash}, format: {all_done.format}, tag: {all_done.tag}")
        elif t == AddProgressType.ABORT:
            print("AddProgress - Abort:")
            abort = event.as_abort()
            print(f"\terror: {abort.error}")
        else:
            print("Unknown AddProgress event:", event)

async def main():
    # setup event loop, to ensure async callbacks work
    iroh.iroh_ffi.uniffi_set_event_loop(asyncio.get_running_loop())

    # Create folder
    os.mkdir("tmp")

    try:
        path = os.path.abspath(os.path.join("tmp"))
        print("Created dir \"tmp\"")

        file_names = ["foo", "bar", "bat"]

        # Create three files in the folder
        for file_name in file_names:
            file_path = os.path.join("tmp", file_name)
            with open(file_path, "w") as f:
                f.write(f"{file_name}")
            print(f"Created file {file_path}")

        node = await Iroh.memory()

        # When `in_place` is True, iroh will NOT copy over the files into its
        # internal database. Only use this option when you know the file will never
        # move or change.
        in_place = False

        # Iroh blobs can be "tagged" with human-readable names, this creates a tag
        # automatically.
        tag = SetTagOption.auto()

        # When adding a single file, if you use `WrapOption.wrap()`, you will turn
        # the single file into a collection with one entry.
        wrap = WrapOption.no_wrap()

        # You can use this callback to react to progress updates.
        callback = AddCallback()

        # Import the directory, creating one blob for each file, and one metadata
        # blob that stores the file names for each blob.
        # Also creates a 'collection' from the directory, grouping together the
        # blobs.

        await node.blobs().add_from_path(path, in_place, tag, wrap, callback)
    except Exception as e:
        print("error: ", e)

    # cleanup dir
    shutil.rmtree("tmp")

# Output:
# Created dir "tmp"
# Created file tmp/foo
# Created file tmp/bar
# Created file tmp/bat
# AddProgress - Found:
# 	id: 1, name: $HOME/tmp/bar, size: 3
# AddProgress - Found:
# 	id: 0, name: $HOME/tmp/foo, size: 3
# AddProgress - Found:
# 	id: 2, name: $HOME/tmp/bat, size: 3
# AddProgress - Progress:
# 	id: 2, offset: 3
# AddProgress - Progress:
# 	id: 0, offset: 3
# AddProgress - Done:
# 	id: 0, hash: bafkr4iae4c5tt4yldi76xcpvg3etxykqkvec352im5fqbutolj2xo5yc5e
# AddProgress - Done:
# 	id: 2, hash: bafkr4iabccdb2eyeu764xoewbcqv62sjaggxibtmxx5tnmwer3wp3rquq4
# AddProgress - Progress:
# 	id: 1, offset: 3
# AddProgress - Done:
# 	id: 1, hash: bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu
# AddProgress - AllDone:
# 	hash: bafkr4iaotzhxuiak7eusnngngnwsqdu4crf4lmdxzkbhuebunevecjzkim, format: BlobFormat.HASH_SEQ, tag: "auto-2023-12-09T22:25:45.296Z"

asyncio.run(main())
