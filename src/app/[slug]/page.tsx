import Image from "next/image";
import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";
import Footer from "./menu/components/footer";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await db.restaurant.findUnique({ where: { slug } });
  if (!restaurant) {
    return notFound();
  }

  return (
    <div>
      <div className="flex h-[90vh] flex-col items-center justify-center px-6">
        {/* LOGO E TITULO */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={restaurant.avatarImageUrl}
            alt={restaurant.name}
            width={82}
            height={82}
          />
          <h2 className="font-semibold">{restaurant.name}</h2>
        </div>
        {/* BEM VINDO */}
        <div className="space-y-2 pt-24 text-center">
          <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
          <p className="opacity-55">
            Escolha como prefere aproveitar sua refeição!
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-8">
          <ConsumptionMethodOption
            slug={slug}
            option="DINE_IN"
            buttonText="Comer aqui"
            imageAlt="Comer aqui"
            imageUrl="/dine_in.png"
          />
          <ConsumptionMethodOption
            slug={slug}
            option="TAKEAWAY"
            buttonText="Para levar"
            imageAlt="Para levar"
            imageUrl="/takeaway.png"
          />
        </div>
      </div>
      <div className="mx-auto h-[10vh] max-w-[420px] rounded-t-xl bg-white">
        <div className="mx-auto max-w-[400px]">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
