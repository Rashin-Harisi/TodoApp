import RadioButton from "@/compponents/elements/RadioButton";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineFileSearch } from "react-icons/ai";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { MdDoneAll } from "react-icons/md";
import { ToastContainer } from "react-toastify";
import { RiEditLine } from "react-icons/ri";

function Task() {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");
  const [caption, setCaption] = useState("");
  const [details, setDetails] = useState([]);
  //console.log("DETAILS", details);
  
  const router = useRouter();
  useEffect(() => {
    taskFetch();
  }, [router.query.taskId]);
  useEffect(() => {
    if(details[0]){
        setTitle(details[0].title)
        setCaption(details[0].caption)
        setStatus(details[0].status)
    }
  }, [details[0]]);
  



  const taskFetch = async () => {
    const res = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify({ id: router.query.taskId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.status === "success") {
        setDetails(data.data)
    };
  };

  const editHandler = async() => {
    const res= await fetch('/api/task',{
        method:"PATCH",
        body: JSON.stringify({title,status,caption,id: router.query.taskId}),
        headers: {
            "Content-Type": "application/json",
          },
    })
    const data=await res.json();
    if (data.status === "success"){ taskFetch()}
    router.push('/')
};
  return (
    <div className="add-form">
      <h2>
        <RiEditLine />
        Edit Todo
      </h2>

      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--textarea">
          <label htmlFor="caption">Caption:</label>
          <textarea
            id="caption"
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="todo"
            title="Todo"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="inProgress"
            title="In Progress"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="review"
            title="Review"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            status={status}
            setStatus={setStatus}
            value="done"
            title="Done"
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={editHandler}>Edit</button>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Task;
