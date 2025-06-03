import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";

export default function App() {
  return (
    <div className=" md:grid max-w-[1440px] mx-auto gap-6 grid-cols-12 grid-rows-2 px-4 lg:px-16 py-10">
      {/* Top Row Cards */}
      <Card className="col-span-12 md:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">What to Taste</p>
          <h4 className="text-white font-medium text-large">Why not to Try our new pastries</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-50"
          src="https://plus.unsplash.com/premium_photo-1715793630618-4480004a5bfd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNha2VzfGVufDB8fDB8fHww"
        />
      </Card>

      <Card className="col-span-12 md:col-span-4 h-[300px]">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Have a new Breads</p>
          <h4 className="text-white font-medium text-large">Buy new flavored Breads</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1509461670379-b58bb542a5cb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNha2VzfGVufDB8fDB8fHww"
        />
      </Card>

      <Card className="col-span-12 md:col-span-4 h-[300px] p-3">
        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Tasty Cakes</p>
          <h4 className="text-white font-medium text-large">Customized Cakes</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card background"
          className="z-0 w-full h-full object-cover opacity-50"
          src="https://plus.unsplash.com/premium_photo-1716398897690-8ff3b2d3511f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDR8fGNha2VzfGVufDB8fDB8fHww"
        />
      </Card>

      {/* Bottom Row Cards */}
      <Card isFooterBlurred className="h-[300px] col-span-12 md:col-span-5">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-white font-medium text-2xl">Brownie Cake</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-50"
          src="https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=1892&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Happy
          </Button>
        </CardFooter>
      </Card>

      <Card isFooterBlurred className="h-[300px] col-span-12 md:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
          <h4 className="text-white/90 font-medium text-xl">Start your day with CupCakes</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1585601356265-5ffabba18b9c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGNha2VzfGVufDB8fDB8fHww"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://heroui.com/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Breathing Taste</p>
              <p className="text-tiny text-white/60">Have a CupCakes</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Feast
          </Button>
        </CardFooter>
      </Card>
      <Card isFooterBlurred className="h-[300px] col-span-12 md:col-span-7">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
          <h4 className="text-white/90 font-medium text-xl">Start your day with Pastries</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover opacity-50"
          src="https://images.unsplash.com/photo-1635888070574-beb32aa9b06d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTF8fGNha2VzfGVufDB8fDB8fHww"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="https://heroui.com/images/breathing-app-icon.jpeg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Have a Taste</p>
              <p className="text-tiny text-white/60">Have a Pastries</p>
            </div>
          </div>
          <Button radius="full" size="sm">
            Enjoy
          </Button>
        </CardFooter>
      </Card>
      <Card isFooterBlurred className="h-[300px] col-span-12 md:col-span-5">
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <p className="text-tiny text-white/60 uppercase font-bold">New</p>
          <h4 className="text-white font-medium text-2xl">Brownie Sweets</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Card example background"
          className="z-0 w-full h-full scale-125 -translate-y-6 object-cover opacity-50"
          src="https://plus.unsplash.com/premium_photo-1716152295675-595f7a5a1d54?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fGNha2VzfGVufDB8fDB8fHww"
        />
        <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
          <div>
            <p className="text-black text-tiny">Available soon.</p>
            <p className="text-black text-tiny">Get notified.</p>
          </div>
          <Button className="text-tiny" color="primary" radius="full" size="sm">
            Notify Me
          </Button>
        </CardFooter>
      </Card>

    </div>
  );
}