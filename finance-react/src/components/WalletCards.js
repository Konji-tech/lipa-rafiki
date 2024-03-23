export default function WalletCards() {
  return (
    <div className="flex flex-row  p-2">
      <div className="p-4 py-6 rounded-md bg-blue-500 text-white w-96 mr-auto flex flex-col gap-3">
        <p class="text-md font-bold">Hi UserName</p>
        <p class="text-4xl font-light">$ 0.00</p>
      </div>
      <div className="flex rounded-xl bg-white border h-48">
        <div class="p-2 border-r-2 flex flex-col items-center justify-center w-48 gap-4">
          <iconify-icon icon="solar:upload-twice-square-line-duotone" class="text-4xl text-green-700" />
          <p class="font-light">Send Money</p>
        </div>
        <div class="p-2 flex flex-col items-center justify-center w-48 gap-4">
          <iconify-icon icon="solar:download-twice-square-line-duotone" class="text-4xl text-blue-700" />
          <p class="font-light">Withdraw Money</p>
        </div>
      </div>
    </div>
  );
}
