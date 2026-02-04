"use client";

import usePremiumModal from "@/hooks/usePremiumModal";
import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import SubscriptionRequestForm from "./SubscriptionRequestForm";

const premiumFeatures = ["AI tools", "Up to 3 resumes"];
const premiumPlusFeatures = ["Infinite resumes", "Design customizations"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"pro" | "pro_plus" | null>(
    null,
  );

  function handlePlanClick(plan: "pro" | "pro_plus") {
    setSelectedPlan(plan);
    setShowForm(true);
  }

  function handleFormSuccess() {
    setShowForm(false);
    setSelectedPlan(null);
    setOpen(false);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!showForm) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>SOMCV Premium</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {!showForm ? (
            <>
              <p>Get a premium subscription to unlock more features.</p>
              <div className="flex">
                <div className="flex w-1/2 flex-col space-y-5">
                  <h3 className="text-center text-lg font-bold">Pro</h3>
                  <ul className="list-inside space-y-2">
                    {premiumFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="size-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => handlePlanClick("pro")}>
                    Get Pro
                  </Button>
                </div>
                <div className="mx-6 border-l" />
                <div className="flex w-1/2 flex-col space-y-5">
                  <h3 className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-center text-lg font-bold text-transparent">
                    Pro Plus
                  </h3>
                  <ul className="list-inside space-y-2">
                    {premiumPlusFeatures.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <Check className="size-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="premium"
                    onClick={() => handlePlanClick("pro_plus")}
                  >
                    Get Pro Plus
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <p>
                Fill out the form below to request a subscription. You will be
                redirected to WhatsApp to complete your request.
              </p>
              <SubscriptionRequestForm
                onSuccess={handleFormSuccess}
                defaultPlan={selectedPlan || undefined}
              />
              <Button
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setSelectedPlan(null);
                }}
                className="w-full"
              >
                Back to Plans
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
