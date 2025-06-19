import Reviews from "@/components/Reviews";
import Store from "@/components/Store";

export default function Home() {
  return (
    <div className="grid grid-cols-1 grid-rows-[auto_auto_auto] items-center justify-items-center px-2 pt-2 lg:pt-14 text-2xl">
      <h1 className="rounded-2xl bg-[#777777] text-center py-2 px-20 lg:px-80 text-4xl lg:text-8xl">
        тестовое задание
      </h1>
      <Reviews />
      <Store />
    </div>
  );
}
