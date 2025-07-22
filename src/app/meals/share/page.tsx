"use client";

import Image from "next/image";
import sideImage from "../../../../public/images/homecooking.jpg";
import ImagePicker from "../../../components/Shares/ImagePicker";
import { addMeal } from "@/lib/_meals";
import { useState } from "react";
import ToastBox from "@/components/Shares/ToastBox";
import { useFormStatus } from "react-dom";

export default function NewRecipe() {
  const [showToast, setShowToast] = useState(false);
  const { pending } = useFormStatus();

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
          await addMeal(formData);
          setShowToast(true);
          setTimeout(() => {
            window.location.href = "/meals";
          }, 2000);
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="John Doe"
                name="creator"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="you@example.com"
                required
              />
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Recipe Name"
                name="title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="recipe"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Short Summary
              </label>
              <input
                type="text"
                id="summary"
                name="summary"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="The best food in town ..."
                required
              />
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
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Write down your instruction here..."
            ></textarea>

            <ImagePicker label="Upload your food" name="image" />
          </section>
        </fieldset>
        <button
          type="submit"
          className="block self-end text-xl mt-4 w-auto hover:cursor-pointer rounded-full bg-green-700 text-white py-3 px-12 hover:opacity-80 active:bg-green-400"
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

      {/* <article className="flex flex-col bg-green-700 rounded-xl w-2/5"></article> */}
    </main>
  );
}
