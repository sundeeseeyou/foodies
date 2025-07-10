import { features } from "./postdata";

export default function MainFeatures() {
  return (
    <div className="flex flex-col gap-8 px-4 py-16 w-full max-w-screen-xl mx-auto overflow-clip">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="lg:pt-4 lg:pr-8">
          <div className="lg:max-w-lg">
            <h2 className="text-base/7 font-semibold text-green-600">
              Deploy faster
            </h2>
            <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
              A better workflow
            </p>
            <p className="mt-6 text-lg/8 text-gray-700">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores
              impedit perferendis suscipit eaque, iste dolor cupiditate
              blanditiis ratione.
            </p>
            <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold text-gray-900">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute top-1 left-1 size-5 text-green-600"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <img
          alt="Cooking Recipe"
          src="/cooking-main-features.jpg"
          width={2432}
          height={1442}
          className="w-4xl max-w-none rounded-xl ring-1 shadow-md sm:w-228 md:-ml-4 lg:-ml-0"
        />
      </div>
    </div>
  );
}
