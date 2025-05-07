import { BookingDoctor as BookingDoctor } from "../assets/index";

export default function Doctor() {
  return (
    <>
      <div className="bg-white z-20 w-full flex md:flex-row flex-col md:gap-14 gap-5 p-5 sm:px-8 sm:py-6 items-center md:items-start lg:items-center rounded-2xl shadow-md">
        {/* Image container with improved responsive sizing */}
        <div className="flex-shrink-0 w-full md:w-auto max-w-[250px]">
          <img
            src={BookingDoctor}
            alt="doctor"
            className="w-full h-auto object-cover rounded-2xl md:max-w-[220px] lg:max-w-[290px]"
          />
        </div>
        <div className="flex flex-col gap-5 xl:max-w-2xl lg:max-w-lg max-w-[290px] items-center md:items-start">
          <h1 className="text-black text-2xl lg:text-4xl font-bold">
            Dr. Kristina Castle
          </h1>
          <p className="text-primary text-xl">Dentist</p>
          <p className="text-gray-500 text-center md:text-start">
            Lorem Ipsum Capitalize on low hanging fruit to identify a ballpark
            value added activity to beta immersion along the information highway
            will close the loop on focusing solely on the bottom line rather
            than client-centric imperatives the efficiency.{" "}
          </p>
          <div className="flex items-center gap-5">
            <div className="flex items-center justify-center size-[60px] rounded-full border border-green-400">
              <p className="text-blue-600 text-2xl">@</p>
            </div>

            <div className="flex flex-col">
              <p className="text-black text-lg font-bold">EMAIL NOW:</p>
              <p className="text-black text-lg">info@doctorate.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
