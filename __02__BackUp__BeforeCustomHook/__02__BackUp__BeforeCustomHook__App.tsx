import { ChangeEvent, useState, FC, useCallback } from "react";
import styled from "styled-components";
import { MemoList } from "./MemoList";



export const App: FC = () => {

  //テキストボックスState
  const [text, setText] = useState<string>("");

  //メモ一覧State
  const [memos, setMemos] = useState<string[]>([]);

  //テキストボックス入力時に入力内容をStateに反映
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)

  //「追加」ボタン押下時
  const onClickAdd = () => {
    //State変更を正常に検知されるために新たな配列尾を生成
    const newMemos = [...memos];
    //テキストボックスの入力内容をメモ配列に追加
    newMemos.push(text);
    setMemos(newMemos);
    //テキストボックスを空に
    setText("");
  };

  //「削除」ボタン押下時(何番目が押されたか引数で受け取る)
  //__コンポーネント化で変更
  //__const onClickDelete = (index: number) => {
  const onClickDelete = useCallback((index: number) => {

    //State変更を正常に検知させるため新たな配列を作成
    const newMemos = [...memos];
    //メモ配列から外套の要素を削除
    newMemos.splice(index, 1);
    setMemos(newMemos);
    /* __コンポーネント化で変更
      削除__  };
      追加__  }, [memos]);
    */
  }, [memos]);

  return (
    <div>
      <h1>簡単メモアプリ</h1>
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      {/* __コンポーネント化で追加
      <MemoList memos={memos} onClickDelete={onClickDelete} /> */}
      <MemoList memos={memos} onClickDelete={onClickDelete} />


      {/*   MemoListのコンポーネント化により不要
      <SContainer>
        <p>メモ一覧</p>
        <ul>
          {memos.map((memo, index) => (
            <li key={memo}>
              <SMemoWrapper>
                <p>{memo}</p>
                <SButton onClick={() => onClickDelete(index)}>削除</SButton>
              </SMemoWrapper>
            </li>
          ))}
        </ul>
      </SContainer>
       */}
    </div>
  );
};


//Style
const SButton = styled.button`margin-left:16px`;


/*  MemoListのコンポーネント化により不要。
const SContainer = styled.div`
  border:solid 1px #ccc;
  padding:16px;
  margin:8px;
`;
const SMemoWrapper = styled.div`
  display:flex;
  aligin-items:center;
`;
*/


//デフォルト__テンプレート
/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
