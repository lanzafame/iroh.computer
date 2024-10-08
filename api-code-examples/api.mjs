const docs = [
  {
    name: 'docs delete',
    description: 'Delete all document entries below a key prefix.',
    slug: 'docs-delete',
    arguments: [
      { name: "prefix", necessity: 'required', description: "Prefix to delete. All entries whose key starts with or is equal to the prefix will be deleted" }
    ],
    examples: {
      console: `> docs create --switch
2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Active doc is now 2aoukeibc2vdy5n2

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs set key value
bafkr4iagirfesfxon7wneztow6ila3w5mm53jnmcq4sek6nnnxxv7wk6bm

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs del key
Deleting all entries whose key starts with key. Continue? yes
Deleted 1 entries.
Inserted an empty entry for author luo73rdznvupzrjb with key key`,
    }
  },
  {
    name: 'docs drop',
    description: 'Delete an entire document from the local node',
    slug: 'docs-drop',
    arguments: [
      { name: "doc", necessity: 'required', description: "Document to operate on." }
    ],
    examples: {
      console: `> docs create --switch
2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Active doc is now 2aoukeibc2vdy5n2

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs set key value
bafkr4iagirfesfxon7wneztow6ila3w5mm53jnmcq4sek6nnnxxv7wk6bm

> docs drop 2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Deleting a document will permanently remove the document secret key, all document entries,
and all content blobs which are not referenced from other docs or tags.
Delete document 2aoukeibc2vdy5n2? yes
Doc 2aoukeibc2vdy5n2 has been deleted.`,
    }
  },
  {
    name: 'docs export',
    description: 'Export the most recent data for a key from a document',
    slug: 'docs-export',
    examples: {
      console: `> docs create --switch
2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Active doc is now 2aoukeibc2vdy5n2

author:luo73rdznvupzrjb doc:2aoukeibc2vdy5n2
> docs set key value
bafkr4iagirfesfxon7wneztow6ila3w5mm53jnmcq4sek6nnnxxv7wk6bm

> docs drop 2aoukeibc2vdy5n2jlihnyv3e26cmketqbropptqfef3v7poe5eq
Deleting a document will permanently remove the document secret key, all document entries,
and all content blobs which are not referenced from other docs or tags.
Delete document 2aoukeibc2vdy5n2? yes
Doc 2aoukeibc2vdy5n2 has been deleted.`,
    }
  },
  {
    name: 'docs get',
    description: 'Get entries in a document.',
    slug: 'docs-get',
    arguments: [
      { name: 'key', necessity: 'required', description: 'Key of the entry to fetch.' },
      { name: 'doc_id', necessity: 'required', description: 'Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also set with `docs set`.' },
      { name: 'prefix', necessity: '', description: 'If true, get all entries that start with key.' },
      { name: 'author', necessity: '', description: 'If provided, only return entries from this author.' },
      { name: 'old', necessity: '', description: 'If true, old entries will be included. By default only the latest value for each key is shown.' },
      { name: 'content', necessity: '', description: 'Also print the content for each entry (but only if smaller than 1MB and valid UTf-8).' }
    ],
    examples: {
      console: `> docs create --switch
dyyelvqqruxjwrlntsdvsksopwznmgnfxpehcsoqckklvqfxar2q
Active doc is now dyyelvqq…

author:fhu3uk4w… doc:dyyelvqq…
> docs set foo bar
@fhu3uk4w…: foo = 6lujp3wx… (3 B)

author:fhu3uk4w… doc:dyyelvqq…
> docs get foo
@fhu3uk4w…: foo = 6lujp3wx… (3 B)
bar

`,
    }
  },
  {
    name: 'docs import',
    description: 'Import data into a document.',
    slug: 'docs-import',
    arguments: [
      { name: 'path', necessity: 'required', description: 'Path to a local file or directory to import. Pathnames will be used as the document key' },
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOC environment variable. Within the Iroh console, the active document can also be set with `docs switch`.' },
      { name: 'author', necessity: 'required', description: 'Author of the entry. Required unless the author is set through the IROH_AUTHOR environment variable. Within the Iroh console, the active author can also be set with `author switch`.' },
      { name: 'prefix', necessity: '', description: 'If true, get all entries that start with key.' },
      { name: 'in place', necessity: '', description: ' If true, don\'t copy the file into iroh, reference the existing file instead, Moving a file imported with `in-place` will result in data corruption' },

    ],
    examples: {
      console: `> docs create --switch
dyyelvqqruxjwrlntsdvsksopwznmgnfxpehcsoqckklvqfxar2q
Active doc is now dyyelvqq…

author:fhu3uk4w… doc:dyyelvqq…
> docs import ~/foo.txt --prefix bar
@fhu3uk4w…: bar/foo.txt = 6lujp3wx… (3 B)

author:fhu3uk4w… doc:dyyelvqq…
> docs get foo
@fhu3uk4w…: foo = 6lujp3wx… (3 B)
bar

`,
    }
  },
  {
    name: 'docs join',
    description: 'Join a document from a ticket.',
    slug: 'docs-join',
    arguments: [
      { name: 'ticket', necessity: 'required', description: 'The ticket to join a document. Create a ticket with \'docs share\'.' },
      { name: 'switch', necessity: '', description: 'Switch to the joined document (only in the iroh console).'}
    ],
    examples: {
      console: `> docs join --switch 6tcadaassjgjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mxvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhlfzyvlqcai55pmzg4d3x34mcpuydxoq4t5ec66zp3k3ouxwadxky745i3dwrhqcig3rqqdifkjjb3drfbo2krc7l3anoqly5wanom756kxmrqnap
tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua`,
    }
  },
  {
    name: 'docs keys',
    description: 'List all keys in a document.',
    slug: 'docs-keys',
    arguments: [
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOC environment variable. Within the iroh console, the active document can also set with `docs set`.'  },
      { name: 'prefix', necessity: 'optional', description: 'Only list keys that start with prefix.' },
      { name: 'author', necessity: 'optional', description: 'Filter by author.' },
    ],
    examples: {
      console: `author:i3vpd4e7… doc:njszszvg…
> docs set foo bar
bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu

author:i3vpd4e7… doc:njszszvg…
> docs set hello world
bafkr4igxrffos4lnhdjn7lioyvkcjsrsd3qsiu6vd4ntvxvxpuchl3myrq

author:i3vpd4e7… doc:njszszvg…
> docs set good morning
bafkr4idyxc27uxtcrzl5a3t42xu7hm3h2wn4mfaqt3ma5ummofsitynxle

author:i3vpd4e7… doc:njszszvg…
> docs keys
@i3vpd4e7…: foo = 6lujp3wx… (3 B)
@i3vpd4e7…: good = pc4ll6s6… (7 B)
@i3vpd4e7…: hello = 26euv2lr… (5 B)

# use a prefix to filter the keys

author:i3vpd4e7… doc:njszszvg…
> docs keys fo
@i3vpd4e7…: foo = 6lujp3wx… (3 B)`,
    }
  },
  {
    name: 'docs list',
    description: 'List documents on this node.',
    slug: 'docs-list',
    examples: {
      console: `> docs list
      tiqpal5qnrb3idy7g4n7hnh5esex7zu6jtqyuwt6hr4iq2nnlpua
      3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
      njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq`,
    }
  },
  {
    name: 'docs create',
    description: 'Create a new blank document.',
    slug: 'docs-create',
    examples: {
      console: `> docs create
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea`,
    }
  },
  {
    name: 'docs set',
    description: 'Set an entry in a document',
    slug: 'docs-set',
    arguments: [
      { name: "key", necessity: 'required', description: "Key to the entry (parsed as UTF-8 string)." },
      { name: "value", necessity: 'required', description: "Content to store for this entry (parsed as UTF-8 string)." },
      { name: "author", necessity: 'required', description: "Author of this entry. Required unless the author is set through the console or the IROH_AUTHOR environment variable." },
    ],
    examples: {
      console: `> docs create --switch
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

> set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`,
      cli: `# create an author if you haven't already
$ IROH_AUTHOR=$(iroh authors create)

# create a document
$ iroh docs create
created d7bb0092bf6d7ee3cb6bd255e88596d3ca16d50ce6935a7721f2ff836a3c0355

# set a key
$ iroh docs 674deec7a19fec50fd6f486a5eef20509073ecf7c527b60a27c84baea90d3816 set "key" "value"
@ydzwyyes…: key = azceusiw… (5 B)`
    }
  },
  {
    name: 'docs share',
    description: 'Share a document with peers.',
    slug: 'docs-share',
    arguments: [
      { name: 'mode', necessity: 'required', description: 'One of \'read\' for Read-only access or \'write\' for Write access.' },
      { name: 'doc', necessity: 'required', description: 'Document to share. In the console the current document is used when no `--doc` is provided.' }
    ],
    examples: {
      console: `# switch to a specific doc
> docs switch njszszvgpziwnxqnsi32nmc7j2czs2rnj3m7czavudurqxld3nbq
Active doc is now njszszvg…

doc: njszszvg…

> docs share write
xvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhlfzyvlqcaidiaglyldhfvq4xeaa5cqswdistl2hje3c24biacig3rqqdifkjjb3drfbo2krc7l3anoqly5wanom756kxmrqnap6tcadaassjgjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mprsyystlwe66cs

# or use --doc flag to get the ticket for a specific doc
> docs share write --doc 3ogcanavjfehmoeuf3jkel5pmbv2bpdwybvzt7xzk5sgbub72mia
gjfmivyaycuads6ek4asma3qacdtvs6waaaaaaaaaanctrkxaetag4aaq45mprsyystlwe66csxvqmruwqvq5l5vc4kvybeybxaaehhlf5mmh72ojerj4e2tcvoajganyabbz2zplnqhpyekxzhljfkldiajjkannnnjiejfkldkaskjlxi0jfwoqppiemxclpilkdipljqhixkkwmhziufkhablskhdjjlllqwoooqusiuypwouuuuippmjkk
  ` }
  },
  {
    name: 'docs switch',
    description: 'Set the active document (only works within the Iroh console).',
    slug: 'docs-switch',
    arguments: [
      { name: 'id', necessity: 'required', description: 'The [document identifier](/docs/components/documents#document-identifiers) of the document to switch to.' },
    ],
    examples: {
      console: `> docs create
ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

> docs switch ktrygcpxealfdtfmohw66nb2keivu52opk65cyj4j7jy7wior7ea

doc:ktrygcpx
>`,
    }
  },
  {
    name: 'docs watch',
    description: 'Watch for changes and events on a document',
    slug: 'docs-watch',
    arguments: [
      { name: 'doc', necessity: 'required', description: 'Document to operate on. Required unless the document is set through the IROH_DOCS environment variable. Within the iroh console, the active document can also set with `docs set`.'  }
    ],
    examples: {
      console: `author:i3vpd4e7… doc:njszszvg…
  > docs set foo bar
  bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu

  > docs watch
  # events will show up here!`,
    }
  }

]

const authors = [
  {
    name: 'authors switch',
    description: 'Set the active author (only works within the Iroh console)',
    slug: 'authors-switch',
    arguments: [
      {
        name: 'author',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: `author:2ziftxhhind7atie 
> authors switch ofnu75vdzmg3wweuz6yamx65lryav62nk7zdjxtexvzcmiqzoloa
Active author is now ofnu75vdzmg3wweu

author:ofnu75vdzmg3wweu 
>`
    }
  },
  {
    name: 'authors create',
    description: 'Create a new author',
    slug: 'authors-create',
    arguments: [
      {
        name: 'switch',
        necessity: '',
        description: 'Switch to the created author (only in the Iroh console)'
      }
    ],
    examples: {
      console: `author:ofnu75vdzmg3wweu 
> authors create --switch
nybdmk5526rlj4xcbr5urwhmy3at7z6rgn7dchkxhfsuydiibgca
Active author is now nybdmk5526rlj4xc

author:nybdmk5526rlj4xc 
>`
    }
  },
  {
    name: 'authors delete',
    description: 'Delete an author',
    slug: 'authors-delete',
    arguments: [
      {
        name: 'author',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: `author:6znvk7u4pw4wqwlu 
> authors list
ofnu75vdzmg3wweuz6yamx65lryav62nk7zdjxtexvzcmiqzoloa
2ziftxhhind7atieqmppynzuiu6w6btadbizarqzi45hj3o5ltka
6znvk7u4pw4wqwlup3qa2a4gs3dwn3zpeal7y55vhg2jcwgqa5ma

author:6znvk7u4pw4wqwlu 
> authors delete ofnu75vdzmg3wweuz6yamx65lryav62nk7zdjxtexvzcmiqzoloa
Deleted author ofnu75vdzmg3wweu`
    }
  },
  {
    name: 'authors export',
    description: 'Export an author',
    slug: 'authors-export',
    arguments: [
      {
        name: 'author',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: `> authors export 2ziftxhhind7atieqmppynzuiu6w6btadbizarqzi45hj3o5ltka
44vcteuiwhstlm6rs5ufzr3hbmdlwzahceundngymcmtdvxr5dxa`
    }
  },
  {
    name: 'authors import',
    description: 'Import an author',
    slug: 'authors-import',
    arguments: [
      {
        name: 'author',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: `> authors import qey4omlgcbx3gnve7ycaiyz2uh4twrxaiructiuynwosl4pfky4q
Imported 6znvk7u4pw4wqwlu`
    }
  },
  {
    name: 'authors default',
    description: 'Print the default author for this node',
    slug: 'authors-default',
    arguments: [
      {
        name: 'switch',
        necessity: '',
        description: 'Switch to the default author (only in the Iroh console)'
      }
    ],
    examples: {
      console: `author:6znvk7u4pw4wqwlu 
> authors default --switch
2ziftxhhind7atieqmppynzuiu6w6btadbizarqzi45hj3o5ltka
Active author is now 2ziftxhhind7atie

author:2ziftxhhind7atie 
> `
    }
  },
  {
    name: 'authors list',
    description: 'List authors',
    slug: 'authors-list',
    arguments: [],
    examples: {
      console: `> authors list
2ziftxhhind7atieqmppynzuiu6w6btadbizarqzi45hj3o5ltka
6znvk7u4pw4wqwlup3qa2a4gs3dwn3zpeal7y55vhg2jcwgqa5ma`
    }
  }
]

const gossip = [
  {
    name: 'gossip subscribe',
    description: 'Subscribe to a gossip topic',
    slug: 'gossip-subscribe',
    arguments: [
      {
        name: 'topic',
        necessity: 'required',
        description: 'The topic to subscribe to'
      },
      {
        name: 'bootstrap',
        necessity: '',
        description: 'one or more nodeIDs to bootstrap the subscription (nodes already hosting the topic)'
      }
    ],
    examples: {
      console: `> gossip subscribe --topic your-topic-name-here`
    }
  },
]

const tags = [
  {
    name: 'tags list',
    description: 'List all tags',
    slug: 'tags-list',
    arguments: [],
    examples: {
      console: `> blobs add README.md --wrap --tag tagged-collection
# blob is added as a collection
> blobs add README.md --tag tagged-blob
> tags list
"tagged-collection": 27xwmw3552lwdme4t35yrlq6ny2tsq3b2wfegrxgmhkfb53vrxqq (HashSeq)
"tagged-blob": 7lnuloaubh7sysukojybgp5xwgwe6jnochxy3ew4fxpzzjbuvpiq (Raw)`
    }
  },
  {
    name: 'tags delete',
    description: 'Delete a tag',
    slug: 'tags-delete',
    arguments: [
      {
        name: 'tag',
        necessity: 'required',
        description: ''
      },
      {
        name: 'hex',
        necessity: '',
        description: ''
      }
    ],
    examples: {
      console: `> tags list
"tagged-blob": 7lnuloaubh7sysukojybgp5xwgwe6jnochxy3ew4fxpzzjbuvpiq (Raw)
"tagged-collection": 27xwmw3552lwdme4t35yrlq6ny2tsq3b2wfegrxgmhkfb53vrxqq (HashSeq)

> tags delete tagged-collection

> tags list
"tagged-blob": 7lnuloaubh7sysukojybgp5xwgwe6jnochxy3ew4fxpzzjbuvpiq (Raw)`
    }
  }
]

const blobs = [
  {
    name: 'blobs add',
    description: 'Add data from PATH to the running node',
    slug: 'blobs-add',
    arguments: [
      {
        name: 'source',
        necessity: 'required',
        description: 'Path to a file or folder'
      },
      {
        name: 'in-place',
        necessity: '',
        description: 'Add in place'
      },
      {
        name: 'tag',
        necessity: '',
        description: 'Tag to tag the data with'
      },
      {
        name: 'wrap',
        necessity: '',
        description: 'Wrap the added file or directory in a collection'
      },
      {
        name: 'filename',
        necessity: '',
        description: 'Override the filename used for the entry in the created collection'
      },
      {
        name: 'no-ticket',
        necessity: '',
        description: 'Do not print the all-in-one ticket to get the added data from this node'
      }
    ],
    examples: {
      console: `> blobs add ~/my_txt.txt
Adding my_txt.txt as /Users/me/my_txt.txt...
- /Users/me/my_txt.txt: 328 B bafkr4igef2yiz2nz33tljfdezzr45cos5lnc2urjmfi6zghbsnfzvpdpa4
Total: 328 B

Collection: bafkr4ie3xsx3vdsbflainnk6p4xs4h2hq3hdmuasuoflkgybvnsbljb3ke`
    }
  },
  {
    name: 'blobs download',
    description: 'Download data to the running node\'s database and provide it',
    slug: 'blobs-get',
    arguments: [
      {
        name: 'ticket or hash',
        necessity: 'required',
        description: 'Ticket or Hash to use'
      },
      {
        name: 'address',
        necessity: '',
        description: 'Additional socket address to use to contact the node. Can be used multiple times'
      },
      {
        name: 'relay-url',
        necessity: '',
        description: 'Override the relay URL to use to contact the node'
      },
      {
        name: 'recursive',
        necessity: '',
        description: 'Override to treat the blob as a raw blob or a hash sequence'
      },
      {
        name: 'override-addresses',
        necessity: '',
        description: 'If set, the ticket\'s direct addresses will not be used'
      },
      {
        name: 'node',
        necessity: '',
        description: 'NodeId of the provider'
      },
      {
        name: 'out',
        necessity: '',
        description: 'Directory or file in which to save the file(s)'
      },
      {
        name: 'stable',
        necessity: '',
        description: 'If set, the data will be moved to the output directory, and iroh will assume that it will not change'
      },
      {
        name: 'tag',
        necessity: '',
        description: 'Tag to tag the data with'
      },
      {
        name: 'queued',
        necessity: '',
        description: 'If set, will queue the download in the download queue'
      }
    ],
    examples: {
      console: `> blobs get his7xcvl5jc734mwbtgtkkvxeafrdcitmg2jvdmxk7ri7abgr33a --address 192.168.0.15:41918 --node w3mj2iw47i2pgbdrnutaamsqm6h2bj6r7yp7h2vliruq3vry535a
Fetching: his7xcvl5jc734mwbtgtkkvxeafrdcitmg2jvdmxk7ri7abgr33a
Transferred 14.20 KiB in 0 seconds, 173.20 KiB/s`
    }
  },
  {
    name: 'blobs export',
    description: 'Export a blob from the internal blob store to the local filesystem',
    slug: 'blobs-export',
    arguments: [
      {
        name: 'hash',
        necessity: 'required',
        description: 'The hash to export'
      },
      {
        name: 'out',
        necessity: 'required',
        description: 'Directory or file in which to save the file(s)'
      },
      {
        name: 'recursive',
        necessity: '',
        description: 'Set to true if the hash refers to a collection and you want to export all children of the collection'
      },
      {
        name: 'stable',
        necessity: '',
        description: 'If set, the data will be moved to the output directory, and iroh will assume that it will not change'
      }
    ],
    examples: {
      console: '> blobs export his7xcvl5jc734mwbtgtkkvxeafrdcitmg2jvdmxk7ri7abgr33a ./very_important.txt'
    }
  },
  {
    name: 'blobs list blobs',
    description: 'List the available blobs on the running provider',
    slug: 'blobs-list-blobs',
    arguments: [],
    examples: {
      console: `> blobs list blobs
 bafkr4idcy33utsake6atvbagnojkn7odp7mdo6n7tvspd4ndnewphj67xu (116.96 KiB)
 bafkr4idyxc27uxtcrzl5a3t42xu7hm3h2wn4mfaqt3ma5ummofsitynxle (7 B)
 bafkr4ie3xsx3vdsbflainnk6p4xs4h2hq3hdmuasuoflkgybvnsbljb3ke (46 B)
 bafkr4igef2yiz2nz33tljfdezzr45cos5lnc2urjmfi6zghbsnfzvpdpa4 (328 B)
 bafkr4igxrffos4lnhdjn7lioyvkcjsrsd3qsiu6vd4ntvxvxpuchl3myrq (5 B)
 bafkr4ihs5cl65v6sa3gykxkecwmpuuq2xr22vfuvh2l4amgjmewdbqjjhu (3 B)
 bafkr4ih5e75yrvu63folnkhvppj3pnx3he2oudmr35x2xc2puodrr2kryy (47 B)`,
    }
  },
  {
    name: 'blobs list incomplete-blobs',
    description: 'List the blobs on the running provider that are not full files',
    slug: 'blobs-list-incomplete-blobs',
    arguments: [],
    examples: {
      console: '> blobs list incomplete-blobs'
    }
  },
  {
    name: 'blobs list collections',
    description: 'List the available collections on the running provider',
    slug: 'blobs-list-collections',
    arguments: [],
    examples: {
      console: `> blobs list collections
"auto-2024-08-20T17:49:54.244Z": myumj2a42x6ky72erzt4djhu3ya46h2e7sp4ibqzew2ne4xnbpua 3 blobs (0 B)`
    }
  },
  {
    name: 'blobs validate',
    description: 'Validate hashes on the running node',
    slug: 'blobs-validate',
    arguments: [
      {
        name: 'verbose',
        necessity: '',
        description: ''
      },
      {
        name: 'repair',
        necessity: '',
        description: 'Repair the store by removing invalid data'
      }
    ],
    examples: {
      console: '> blobs validate'
    }
  },
  {
    name: 'blobs consistency-check',
    description: 'Perform a database consistency check on the running node',
    slug: 'blobs-consistency-check',
    arguments: [
      {
        name: 'verbose',
        necessity: '',
        description: ''
      },
      {
        name: 'repair',
        necessity: '',
        description: 'Repair the store by removing invalid data'
      }
    ],
    examples: {
      console: '> blobs consistency-check'
    }
  },
  {
    name: 'blobs delete blob',
    description: 'Delete the given blobs',
    slug: 'blobs-delete-blob',
    arguments: [
      {
        name: 'hash',
        necessity: 'required',
        description: 'Blobs to delete'
      }
    ],
    examples: {
    }
  },
  {
    name: 'blobs share',
    description: 'Get a ticket to share this blob',
    slug: 'blobs-share',
    arguments: [
      {
        name: 'hash',
        necessity: 'required',
        description: 'Hash of the blob to share'
      },
      {
        name: 'addr-options',
        necessity: '',
        description: 'Options to configure the address information in the generated ticket'
      },
      {
        name: 'recursive',
        necessity: '',
        description: 'If the blob is a collection, the requester will also fetch the listed blobs'
      }
    ],
    examples: {
      console: `> blobs share myumj2a42x6ky72erzt4djhu3ya46h2e7sp4ibqzew2ne4xnbpua
Ticket for blob myumj2a42x6ky72erzt4djhu3ya46h2e7sp4ibqzew2ne4xnbpua (96 B)
blobac3nrhjc3t5dj4yeofwsmabskbty7ifh2h7b747kvncgsdowhdxpuaaaabtcrrhidtk7zld7ishgpqne6tpadty7it6j7ragdes3juts5uf6q`
    }
  }
]

const net = [
  {
    name: 'net remote-list',
    description: 'Get information about the different remote nodes',
    slug: 'net-remote-list',
    arguments: [],
    examples: {
      console: `> net remote-list
 current time: Tue, 20 Aug 2024 21:30:33 +0000

 node id                                               relay  conn type  latency    last used 
 ewrl7gvv6ndtqmtvd2s6tmblvcah3yl7mn4wyyftem7dtjkrlbvq         direct     1ms,527μs  3s`
    }
  },
  {
    name: 'net remote',
    description: 'Get information about a particular remote node',
    slug: 'net-remote',
    arguments: [
      {
        name: 'node_id',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: `> net remote ewrl7gvv6ndtqmtvd2s6tmblvcah3yl7mn4wyyftem7dtjkrlbvq
 current time     Tue, 20 Aug 2024 21:30:50 +0000                      
 node id          ewrl7gvv6ndtqmtvd2s6tmblvcah3yl7mn4wyyftem7dtjkrlbvq 
 relay url        unknown                                              
 connection type  direct                                               
 latency          1ms,527μs                                            
 last used        3s                                                   
 known addresses  1                                                    

 addr                latency     last control  last data  last alive 
 192.168.0.15:11204  1ms,527μs   ping← ( 3s )  3s         3s         `
    }
  },
  {
    name: 'net node-addr',
    description: 'Get the node addr of this node',
    slug: 'net-node-addr',
    arguments: [],
    examples: {
      console: `> net node-addr
Node ID: w3mj2iw47i2pgbdrnutaamsqm6h2bj6r7yp7h2vliruq3vry535a
Home Relay: https://foo.bar/
Direct Addresses (1):
 192.168.0.15:41918`
    }
  },
  {
    name: 'net add-node-addr',
    description: 'Add this node addr to the known nodes',
    slug: 'net-add-node-addr',
    arguments: [
      {
        name: 'node_id',
        necessity: 'required',
        description: ''
      },
      {
        name: 'relay',
        necessity: 'required',
        description: ''
      },
      {
        name: 'addresses',
        necessity: 'required',
        description: ''
      }
    ],
    examples: {
      console: '> net add-node-addr dlwnphjvqn43cyywsurzmr46i5cpg56ox5xhsqyq2jddly3o5m5q  https://foo.bar/ 192.168.0.15:1120'
    }
  },
  {
    name: 'net home-relay',
    description: 'Get the relay server we are connected to',
    slug: 'net-home-relay',
    arguments: [],
    examples: {
      console: `> net home-relay
Home Relay: https://foo.bar/`
    }
  }
]


const api = {
  net,
  docs,
  authors,
  tags,
  gossip,
  blobs
};

export default api;
