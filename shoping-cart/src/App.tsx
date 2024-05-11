import "./index.css";
import "./App.css";
import { useEffect, useState } from "react";
import groceringCartImg from "./assets/grocery-cart.png";

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [groceryItems, setGroceryItems] = useState<
    { quantity: number; name: string; completed: boolean }[]
  >([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    determinateCompletedStatus();
  }, [groceryItems]);

  const determinateCompletedStatus = () => {
    if (!groceryItems.length) {
      setIsCompleted(false);
    }
    let isAllCompleted = true;

    groceryItems.forEach((el) => {
      if (!el.completed) {
        isAllCompleted = false;
      }
    });
    setIsCompleted(isAllCompleted);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addGroceryitem2 = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const updatedGroceryList = [...groceryItems];

      const itemIndex = groceryItems.findIndex(
        (item) => item.name === inputValue
      );

      if (itemIndex === -1) {
        updatedGroceryList.push({
          quantity: 1,
          name: inputValue,
          completed: false,
        });
      } else {
        updatedGroceryList[itemIndex].quantity++;
      }
      setGroceryItems(updatedGroceryList);
      setInputValue("");
    }
  };

  const deleteItem = (name: string) => {
    const updatedGroceryList = [...groceryItems].filter(
      (item) => item.name !== name
    );
    setGroceryItems(updatedGroceryList);
  };

  const handleUpdateCopletedStatus = (status: boolean, index: number) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);
  };

  const renderGroceryList = () => {
    return groceryItems.map((el, i) => (
      <li key={i}>
        <div className="container">
          <input
            type="checkbox"
            onChange={(e) => {
              handleUpdateCopletedStatus(e.target.checked, i);
            }}
            checked={el.completed}
          />
          <p>
            {el.name} {el.quantity > 1 ? <span> x {el.quantity}</span> : null}{" "}
          </p>
        </div>
        <div>
          <button className="remove-button" onClick={() => deleteItem(el.name)}>
            X
          </button>
        </div>
      </li>
    ));
  };

  return (
    <main className="app">
      <div>
        <div>
          {isCompleted && <h4 className="success">bli nje kosss</h4>}
          <div className="header">
            <h1 className="">Shopping List</h1>
            <img src={groceringCartImg} alt="" />
            <input
              type="text"
              placeholder="Add an Item"
              value={inputValue}
              onChange={handleChange}
              onKeyDown={addGroceryitem2}
            />
          </div>
        </div>
        <ul>{renderGroceryList()}</ul>
      </div>
    </main>
  );
}

export default App;
