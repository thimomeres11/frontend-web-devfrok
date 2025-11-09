/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import "./App.css";
import Gallery from "./components/Gallery";
import SingleRootElement from "./materi/jsx/SingleRootElement";
import Fragments from "./materi/jsx/Fragments";
import DisplayData from "./materi/jsx/DisplayData";
import AturanJSX from "./materi/jsx/AturanJSX";
import ClassComponent from "./materi/react-component/ClassComponent";
import FunctionComponent from "./materi/react-component/FunctionComponent";
import PropsComponent from "./materi/react-component/PropsComponent";
import ChildrenProps from "./materi/react-component/ChildrenProps";
import ListItem from "./materi/react-component/ListItem";
import ClickButton from "./materi/event-handler/ClickButton";
import TextInput from "./materi/event-handler/TextInput";
import KeyPress from "./materi/event-handler/KeyPress";
import FormSubmit from "./materi/event-handler/FormSubmit";
import GreetingComponent from "./materi/state/GreetingComponent";
import CounterComponent from "./materi/state/CounterComponent";
import UserProfile from "./materi/state/UserProfile";
import ItemList from "./materi/state/ItemList";
import FormComponent from "./materi/state/FormComponent";
import { IfElse } from "./materi/conditional-rendering/IfElse";
import TernaryOperator from "./materi/conditional-rendering/TernaryOperator";
import LogicalOperator from "./materi/conditional-rendering/LogicalOperator";
import Effect from "./materi/effect-hooks/Effect";
import CleanUpFunction from "./materi/effect-hooks/CleanUpFunction";
import UsersList from "./materi/work-with-api/UsersList";
import Counter from "./materi/reducer/Counter";
import SistemEvaluasiCPL from "./test/SistemEvaluasiCPL";

function App() {
  return (
    <>
      <Gallery />
    </>
  );
}

export default App;
