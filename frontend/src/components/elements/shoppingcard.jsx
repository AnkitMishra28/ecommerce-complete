import { Card, CardHeader, CardBody, Image } from "@heroui/react";

export default function ProductCard() {
  return (
    <Card
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      isPressable
      onPress={() => console.log("Product clicked")}
    >
      <CardBody className="p-0">
        <Image
          alt="Product image"
          src="https://heroui.com/images/hero-card-complete.jpeg"
          className="w-full h-50 object-cover rounded-t-xl transition-transform duration-300 group-hover:scale-105"
        />
      </CardBody>

      <CardHeader className="flex flex-col items-start px-4 py-3">
        <span className="text-xs text-gray-500 uppercase">Category</span>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Frontend Radio</h4>
        <div className="flex justify-between items-center w-full mt-2">
          <p className="text-sm text-gray-600 dark:text-gray-300">12 Tracks</p>
          <p className="text-sm font-bold text-green-600">$9.99</p>
        </div>
      </CardHeader>
    </Card>
  );
}
