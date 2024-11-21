import { Comments } from "../types/dataType";

function Card({ user, score, content, createAt }: Comments) {
  console.log(user.image.png);

  return (
    <div className="bg-white w-1/2 rounded p-8 flex gap-3">
      <div className="bg-gray-300 p-2 flex flex-col items-center justify-between rounded-md">
        <button className="text-gray-500 font-bold">+</button>
        <p className="text-indigo-800 font-bold">{score}</p>
        <button className="text-gray-500 font-bold">-</button>
      </div>
      <div className="flex flex-col gap-3">
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={user.image.png} className=" w-12" />
            <h6>{user.username}</h6>
            <p className=" text-zinc-500">{createAt}</p>
          </div>
          <button className="flex items-center gap-3 rounded-md w-20 font-bold hover:bg-indigo-300">
            <img src="./images/icon-reply.svg" />
            <p style={{ color: "#5357B6" }}>REPLY</p>
          </button>
        </section>
        <p className=" text-gray-500">{content}</p>
      </div>
    </div>
  );
}

export default Card;
