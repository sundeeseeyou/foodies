"use client";

import Image from "next/image";
import sideImage from "../../../../public/images/homecooking.jpg";
import ImagePicker from "../../../components/Shares/ImagePicker";
import { addMeal } from "@/lib/_meals";
import { useState, useEffect, useActionState } from "react";
import ToastBox from "@/components/Shares/ToastBox";
import { AddMealResult } from "@/components/types";
import { formValidation } from "@/lib/_meal-schema";
import { useRouter } from "next/navigation";

export default function NewRecipe() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(
    null
  );
  const [isFormComplete, setFormComplete] = useState(false);

  const [formInfo, setFormInfo] = useState({
    title: "",
    summary: "",
    instructions: "",
    creator: "",
    creator_email: "",
    image: null as File | null,
  });

  useEffect(() => {
    const result = formValidation.safeParse({
      ...formInfo,
      email: formInfo.creator_email,
    });

    setFormComplete(result.success && formInfo.image !== null);
  }, [formInfo]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormInfo((prev) => ({ ...prev, [name]: value }));
  }

  const [state, formAction, isPending] = useActionState(
    async (_: AddMealResult, formData: FormData) => {
      return await addMeal(formData);
    },
    { success: false, errors: {} }
  );

  //the implementation of Zod
  useEffect(() => {
    if (!state.success) {
      setFormErrors(state.errors);

      const firstErr = Object.keys(state.errors)[0];
      const el = document.querySelector(`[name="${firstErr}"]`) as HTMLElement;
      el?.focus();
    } else {
      setFormErrors(null);
      setShowToast(true);
      setTimeout(() => {
        router.push("/meals");
      }, 2000);
    }
  }, [state]);
  return (
    <main className="flex flex-row justify-center items-stretch gap-8 my-8 p-4 max-w-screen-xl w-full mx-auto">
      {showToast && (
        <ToastBox
          message="Upload Success"
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}
      <form className="flex flex-col w-3/5 gap-4 mx-auto" action={formAction}>
        <fieldset className="border border-gray-200 rounded-xl px-8 pt-8 pb-12 bg-white">
          <legend className="text-xl px-4">Your Identity</legend>
          <section className="grid lg:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="fullname"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="creator"
                value={formInfo.creator}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="John Doe"
              />
              {formErrors?.creator && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.creator[0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="creator_email"
                value={formInfo.creator_email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="you@example.com"
              />
              {formErrors?.creator_email && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.creator_email[0]}
                </p>
              )}
            </div>
          </section>
        </fieldset>
        <fieldset className="border border-gray-200 rounded-xl px-8 pt-8 pb-12 bg-white">
          <legend className="text-xl px-4">Your Recipe Details</legend>
          <section className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="recipe-title"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Recipe Name
              </label>
              <input
                type="text"
                id="recipe-title"
                name="title"
                value={formInfo.title}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Recipe Name"
              />
              {formErrors?.title && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.title[0]}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="summary"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Short Summary
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                value={formInfo.summary}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="The best food in town ..."
              />
              {formErrors?.summary && (
                <p className="text-red-600 text-sm mt-1">
                  {formErrors.summary[0]}
                </p>
              )}
            </div>
            <label
              htmlFor="instructions"
              className="block text-sm font-medium text-gray-900"
            >
              Cook Instructions
            </label>
            <textarea
              id="instructions"
              name="instructions"
              onChange={handleChange}
              value={formInfo.instructions}
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Write down your instruction here..."
            ></textarea>
            {formErrors?.instructions && (
              <p className="text-red-600 text-sm mt-1">
                {formErrors.instructions[0]}
              </p>
            )}

            <ImagePicker
              label="Upload your food"
              name="image"
              onChange={(file) =>
                setFormInfo((prev) => ({
                  ...prev,
                  image: file,
                }))
              }
            />
            {formErrors?.image && (
              <p className="text-red-600 text-sm mt-1">{formErrors.image[0]}</p>
            )}
          </section>
        </fieldset>
        <button
          type="submit"
          className={`block self-end text-xl mt-4 w-auto rounded-full py-3 px-12 text-white transition ${
            !isFormComplete || isPending
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-700 hover:opacity-80 hover:cursor-pointer active:bg-green-400"
          }`}
          disabled={!isFormComplete || isPending}
        >
          {isPending ? "..." : "Submit"}
        </button>

        {!isFormComplete && (
          <p className="text-xs self-end text-gray-400 mt-2 w-48 text-right">
            *Fill in the fields and upload the image before submitting
          </p>
        )}
      </form>

      <section className="relative w-2/5">
        <Image
          src={sideImage}
          alt="side image"
          fill
          className="object-cover rounded-3xl border border-gray-400"
          sizes="(max-width: 768px) 100%, 50vw"
        />
      </section>
    </main>
  );
}
