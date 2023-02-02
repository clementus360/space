import Image from "next/image";

export default function Footer() {
  return (
    <section className="fixed w-screen h-max bottom-0 p-4 flex gap-16 items-center justify-center shadow-md">
      <Image
        src="/images/phone-solid.svg"
        alt="end call"
        width={30}
        height={30}
      />
      <Image
        src="/images/vector.svg"
        alt="audio control"
        width={30}
        height={30}
      />
      <Image
        src="/images/vector-1.svg"
        alt="video control"
        width={30}
        height={30}
      />
      <Image
        src="/images/vector-2.svg"
        alt="screen control"
        width={30}
        height={30}
      />
    </section>
  );
}
