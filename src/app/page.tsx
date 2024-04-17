import CardLink from "@/components/card-link";

export default function Home() {
  return (
    <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
      <CardLink href="./buy">買いに来た</CardLink>
      <CardLink href="./stock-up">仕入れてきた</CardLink>
      <CardLink href="./shareholder">株主になる</CardLink>
    </div>
  );
}
