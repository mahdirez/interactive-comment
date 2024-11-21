export default function App() {
  return (
    <div className="bg-stone-200 h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 rounded p-8 flex gap-3">
        <div className="bg-gray-300 p-2 flex flex-col items-center justify-between rounded-md">
          <button className="text-gray-500 font-bold">+</button>
          <p className="text-indigo-800 font-bold">24</p>
          <button className="text-gray-500 font-bold">-</button>
        </div>
        <div className="flex flex-col gap-3">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="./images/avatars/image-amyrobson.png"
                className=" w-12"
              />
              <h6>amyrobson</h6>
              <p className=" text-zinc-500">1 month ago</p>
            </div>
            <button className="flex items-center gap-3 rounded-md w-20 font-bold hover:bg-indigo-300">
              <img src="./images/icon-reply.svg" />
              <p style={{ color: "#5357B6" }}>REPLY</p>
            </button>
          </section>
          <p className=" text-gray-500">
            Impressive! Though it seems the drag feature could be improved. But
            overall it looks incredible. You've nailed the design and the
            responsiveness at various breakpoints works really well.
          </p>
        </div>
      </div>
    </div>
  );
}
