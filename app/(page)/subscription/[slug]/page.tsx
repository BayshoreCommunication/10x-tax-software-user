import { auth } from "@/auth";
import SubscriptionPaymentForm from "@/components/subscription/SubscriptionPaymentForm";

const page = async ({ params }: any) => {
  const session = await auth();
  const { slug } = params;

  return (
    <div className="bg-[#eeeeee]">
      <SubscriptionPaymentForm
        subscriptionType={slug}
        token={session?.user?.accessToken}
      />
    </div>
  );
};

export default page;
