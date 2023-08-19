"use client"

import React, {useState, useRef, useEffect} from 'react'
import {clsx} from 'clsx';
import Image from 'next/image';
import '@lottiefiles/lottie-player';
import { create } from '@lottiefiles/lottie-interactivity';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef(); // 1. create a reference for the lottie player
  }
  componentDidMount() {
    // 3. listen for player load. see lottie player repo for other events
    this.myRef.current.addEventListener('load', function (e) {
      // 4. configure the interactivity library
      create({
        mode: 'scroll',
        player: '#firstLottie',
        container: '#story',
        actions: [
          {
            visibility: [0.1, 1],
            type: 'seek',
            frames: [0, 100],
          },
        ],
      });
    });
  }
  render() {
    return (
      <lottie-player
        ref={this.myRef} // 2. set the reference for the player
        id="firstLottie"
        mode="normal"
        src="https://lottie.host/1a978da9-f911-4638-bb0e-93db35fb9a4e/pBTOhmxLzY.json"
        style={{ width: '320px' }}
      ></lottie-player>
    );
  }
}


function ScrollFadeIn({ className, children }) {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // In your case there's only one element to observe:     
      if (entries[0].isIntersecting) {
      
        // Not possible to set it back to false like this:
        setVisible(true);
        
        // // No need to keep observing:
        // observer.unobserve(domRef.current);
      } else if (!entries[0].isIntersecting) {
        setVisible(false);
      }
    });
    
    console.log(domRef);
    observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  return (<div ref={domRef} className={clsx(className, isVisible && 'motion-safe:animate-fadeIn')}>{ children }</div>);
};

function TextElement({children}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[35vh] sticky top-0">
      <ScrollFadeIn className="sm:w-2/3 lg:w-5/12">
        {children}
      </ScrollFadeIn>
    </div>
  )
}

export function Overview() {
  return (
    <div className="bg-white text-black">

      <section className="w-screen h-screen pt-20 bg-iroh-kv-2 bg-cover">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-[35vh]">
          <ScrollFadeIn className="sm:w-2/3 lg:w-5/12">
            <h2 className="font-space font-bold text-4xl leading-tight">Iroh is a protocol for scaling data distribution.</h2>
            <p className="text-md text-xl">Here's how it works</p>
          </ScrollFadeIn>
        </div>
      </section>

      <div id="story" className='flex'>
        <div className='w-1/2'>
          <section className="h-screen">
            <div className="sticky top-0 mt-20">
              <h4 className="font-space-mono font-bold text-lg text-irohPurple-500">01</h4>
            </div>
            <TextElement>
              <h2 className="font-space bold text-2xl">Any app that includes the iroh library an iroh <i>node</i>. Iroh is designed to work in lots of places: phones, tablets, desktop devices, and web servers.</h2>
            </TextElement>
          </section>

          <section className="h-screen">
            <TextElement>
              <h2 className="font-space bold text-2xl">A node provides a database to the user, and can connect to any other node on the network to fetch and send data to populate the database.</h2>
              <h3 className='text-lg mt-5'>Direct connections mean iroh networks can reach massive sizes without over-burdening any one node.</h3>
            </TextElement>
          </section>

          <section className="h-screen">
            <TextElement>
              <h2 className="font-space bold text-2xl">Iroh nodes create and join <i>documents:</i> mutable key-value stores that multiple users read from, write to, and sync with, subscribing to live updates in real time.</h2>
            </TextElement>
          </section>

          <section className="h-screen">
            <TextElement>
              <h2 className="font-space bold text-2xl">Iroh nodes create and join <i>documents:</i> mutable key-value stores that multiple users read from, write to, and sync with, subscribing to live updates in real time.</h2>
            </TextElement>
          </section>

          <section className="h-screen">
            <TextElement>
              <h2 className="font-space bold text-2xl">Every iroh network has an <i>anchor</i>, a node that functions like a traditional web server to support the network. They help peers find each other and back up content to keep it available when peers go offline. Anchor nodes can be created with one click on <a className='color-red' href='https://iroh.network'>iroh.network</a>.</h2>
            </TextElement>
          </section>

          <section className="h-screen">
            <TextElement>
              <h2 className="font-space bold text-2xl">Every key in a document points to a hash-verified <i>blob</i> of bytes. We say “blobs” because Iroh doesn’t care about what bytes you need moved, the structure is up to you. Document blobs can be thousands of tiny JSON files, gig-sized movies, or multi-gig machine learning models. Every blob gets a single CID that peers fetch via relay-backed connections that will automatically resume if broken.</h2>
            </TextElement>
          </section>
        </div>

        <div className='w-1/2 grid place-items-center h-screen sticky top-0'>
          <div className='h-1/2'>
            <Movie />
          </div>
        </div>
      </div>
    </div>
  );
}