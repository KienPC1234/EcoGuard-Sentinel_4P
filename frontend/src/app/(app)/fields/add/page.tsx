"use client"

import { AddFieldWizard } from "@/components/fields/add/AddFieldWizard";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AddFieldPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSaveSuccess = () => {
    setIsSuccess(true);
  }

  const handleDialogClose = () => {
    setIsSuccess(false);
    router.push('/fields');
  }

  return (
    <>
      <div className="flex-1 p-4 md:p-6 lg:p-8">
        <AddFieldWizard onSaveSuccess={handleSaveSuccess} />
      </div>
      <Dialog open={isSuccess} onOpenChange={handleDialogClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Field Saved Successfully!</DialogTitle>
            <DialogDescription>
              The new field has been added to your farm. You can now view it in your "My Fields" list.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={handleDialogClose}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
