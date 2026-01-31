const TrackOrder = () => {
  const steps = ["Placed", "Processing", "Shipped", "Delivered"];
  const currentStep = 1; // Backenddan keladi

  return (
    <div className="animate-fadeIn">
      <h2 className="text-[16px] font-medium mb-6 text-[#3D3D3D]">Track Your Order</h2>
      <div className="bg-[#FBFBFB] p-10 rounded-lg border border-[#EAEAEA]">
        <div className="flex justify-between items-center relative max-w-2xl mx-auto">
          <div className="absolute top-5 left-0 w-full h-[2px] bg-gray-200"></div>
          {steps.map((step, i) => (
            <div key={step} className="z-10 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold ${
                i <= currentStep ? "bg-[#46A358] border-[#46A358] text-white" : "bg-white border-gray-300 text-gray-400"
              }`}>
                {i + 1}
              </div>
              <span className="text-[13px] mt-2 font-medium text-[#3D3D3D]">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;