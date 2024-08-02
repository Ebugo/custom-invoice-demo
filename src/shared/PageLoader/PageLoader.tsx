'use client';
import Image from 'next/image';
import React from 'react';

const PageLoader = () => {
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-[var(--gray-1)] bg-opacity-95 p-5 z-50 overflow-hidden backdrop-filter backdrop-blur-sm"
      style={{ margin: 0 }}>
      <div className="z-10 flex flex-col justify-center items-center mb-4">
        <span className="animate-pulse">
        <Image
          width={0}
          height={0}
          src="/next.svg"
          alt="loading"
          className="img-fluid !w-10 !h-10"
        />
        </span>
      </div>
    </div>
  );
};

export { PageLoader };
