"use client";

import Image from "next/image";
import sideImage from "../../../../public/images/homecooking.jpg";
import ImagePicker from "../../../components/Shares/ImagePicker";
import { addMeal } from "@/lib/_meals";
import { useState, useEffect, useActionState } from "react";
import ToastBox from "@/components/Shares/ToastBox";
import { useFormStatus } from "react-dom";

export default function NewRecipe() {
  const [showToast, setShowToast] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string[]> | null>(
    null
  );
  const { pending } = useFormStatus();
  useEffect(() => {
    if (formErrors) {
      const firstErrorKey = Object.keys(formErrors)[0];
      const el = document.querySelector(
        `[name="${firstErrorKey}"]`
      ) as HTMLElement;
      el?.focus();
    }
  }, [formErrors]);

  return (
    <main className="flex flex-row justify-center items-stretch gap-8 my-8 p-4 max-w-screen-xl w-full mx-auto">
      {showToast && (
        <ToastBox
          message="Upload Success"
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}
      <form
        className="flex flex-col w-3/5 gap-4 mx-auto"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          try {
            const result = await addMeal(formData);

            if (!result.success) {
              setFormErrors(result.errors);
              return;
            }

            setFormErrors(null);
            setShowToast(true);
            e.currentTarget.reset();
            setTimeout(() => {
              window.location.href = "/meals";
            }, 2000);
          } catch (err) {
            alert("Unexpected error occurred. Please try again.");
            console.error(err);
          }
        }}
      >
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
                name="email"
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
              rows={4}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Write down your instruction here..."
            ></textarea>
            {formErrors?.instructions && (
              <p className="text-red-600 text-sm mt-1">
                {formErrors.instructions[0]}
              </p>
            )}

            <ImagePicker label="Upload your food" name="image" />
            {formErrors?.image && (
              <p className="text-red-600 text-sm mt-1">{formErrors.image[0]}</p>
            )}
          </section>
        </fieldset>
        <button
          type="submit"
          className={`block self-end text-xl mt-4 w-auto rounded-full py-3 px-12 text-white transition ${
            pending
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-700 hover:opacity-80 hover:cursor-pointer active:bg-green-400"
          }`}
          disabled={pending}
        >
          {pending ? "Submitting ..." : "Submit"}
        </button>
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
