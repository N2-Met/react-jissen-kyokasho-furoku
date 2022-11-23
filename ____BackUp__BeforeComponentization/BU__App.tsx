import { ChangeEvent, useState, FC } from "react";
//__ChangeEvent:ユーザーによる要素の値の変更が確定した時に発行される。

//__useState
//____Reactではコンポーネントが持つ「状態」を全てStateとして管理する。
//____上記の状態とは、エラーの有無、ﾃｷｽﾄﾎﾞｯｸｽに入力された値、ﾎﾞﾀﾝを押せるか等。
//____Stateの状態は、変数に保有している。(State関数)
//______テキスト参照。
//______React hooksを基礎から理解する (useState編)    https://qiita.com/seira/items/f063e262b1d57d7e78b4

//__FCとは   関数。FunctionCompotnentの略。constによる型定義でコンポーネントを定義できる。
//____コンポーネントとはReact独自のタグで、オリジナルタグを作成できる。　例：<MyHoge>など独自のタグを作れる。
//______わかりやすいかもしれないReact.FCの使い方 https://interrupt.co.jp/blog/entry/2021/03/05/133925
import styled from "styled-components";



export const App: FC = () => {
  //__↑ReactのFCをベースにオリジナルのAppコンポーネントの作成

  //テキストボックスState
  const [text, setText] = useState<string>("");
  //__Stateの引数について：　
  //__第一引数：State変数    状態を保有する変数
  //__第二引数：Stateを更新するための関数
  //__基本書式：const [hoge, setHoge] = useState(0);    ※useState(0)は初期値の設定。
  //__  useState<型>で型を強制できる。()
  //____テキスト119P参照
  //____React TypeScript useState に型を設定したい    https://chaika.hatenablog.com/entry/2020/08/16/083000

  //メモ一覧State
  const [memos, setMemos] = useState<string[]>([]);

  //テキストボックス入力時に入力内容をStateに反映
  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)
  //__反映先はテキストボックスのState(setTextにより)
  //__HTMLInputElement:<input>要素を操作するための特別なプロパティやメソッドを提供。
  //__(1)<input>タグ内でonchange={onChangeText}が宣言されており、↓
  //____<input>の値の変更が完了するとイベントが発生。(完了ﾀｲﾐﾝｸﾞは、入力完了後に他要素にﾌｫｰｶｽが移動した時。)
  //__(2)onChangeTextは、イベントが発生した際、setText関数でtextの値を更新する。
  //____(e: ChangeEvent<HTMLInputElement>)：変数eはChangeEvent型であり、<input>で発生した要素を保有している。
  //____setText(e.target.value)：変数eの値valueをsetText関数に渡し、valueでtextの値を更新する。


  //「追加」ボタン押下時
  //__<SButton onClick={onClickAdd}>追加</SButton>  で使用
  const onClickAdd = () => {
    //State変更を正常に検知されるために新たな配列を生成
    const newMemos = [...memos];
    //__memos：String型の要素を持つ配列。
    //__[...memos]  ：「...hoge」スプレッド構文。配列に対して使用することで内部の要素を順番に展開する。構文：[...配列名]
    //__配列memosをスプレッド構文で要素を順番に全て取り出し、配列newMemosを生成し値をコピーしている。

    //テキストボックスの入力内容をメモ配列に追加
    newMemos.push(text);
    //__push：配列の「末尾に」要素を追加する。引数は追加する要素。
    //____MDN Web Docs  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/push
    setMemos(newMemos);
    //__setMemosの引数に、pushで末尾に新たなtextを追加した"newMemos"を追加する。
    //テキストボックスを空に
    setText("");
  };

  //「削除」ボタン押下時(何番目が押されたか引数で受け取る)
  //__<SButton onClick={() => onClickDelete(index)}>削除</SButton>  で使用。
  const onClickDelete = (index: number) => {
    //__(index: number)引数として数値型でindexを受け取る。


    //State変更を正常に検知させるため新たな配列を作成
    const newMemos = [...memos];

    //メモ配列から該当の要素を削除
    newMemos.splice(index, 1);
    //__splice(start,deletecount)：配列の要素を取り除く。(挿入も可能だが割愛)
    //____第一引数：start    配列を変更する開始位置のindex
    //____第二引数：deletecount    第一引数startから取り除く要素数。　
    setMemos(newMemos);
  };

  //_________________________ここから再開

  return (
    //JSX記法：HTML形式で記述できる。JavaScriptの記述は"{}"で囲う。
    <div>
      <h1>簡単メモアプリ</h1>
      {/* <input type="text">は基本的な単一行のテキスト入力欄を生成。 */}
      <input type="text" value={text} onChange={onChangeText} />
      <SButton onClick={onClickAdd}>追加</SButton>
      <SContainer>
        <p>メモ一覧</p>
        <ul>
          {memos.map((memo, index) => (
            //__map関数により、配列内のそれぞれすべての要素に対してアロー関数を実行している。
            //__.map((memo, index) ～
            //__map関数の第一引数で「配列の値」を取得しており、memoには配列の値が入る。
            //__map関数の第二引数で「index番号」を取得しており、indexにはindex番号が入る。
            //____mapメソッドについての基礎    https://qiita.com/NNNiNiNNN/items/3743ce6db31a421d88d0

            <li key={memo}>
              {/*__keyはどの要素が変更されたのかReactが識別するために必須。
              idを入れるのが通例。memos.idとか  */}
              {/* <SMemoWrapper>：<div>要素をベースに作成 */}
              <SMemoWrapper>
                <p>{memo}</p>
                <SButton onClick={() => onClickDelete(index)}>削除</SButton>
                {/* onClick={onClickDelete(index)}は不可。（なんで？）
                おそらく直接onClicDeleteを呼び出す場合、SButtonは引数indexを保有していない為、エラーとなる。
                無名関数()経由で呼び出すことで、SButtonがmeosのindexを保有しているかに関わらず実行できる。 */}
              </SMemoWrapper>
            </li>
          ))}
        </ul>
      </SContainer>
    </div>
  );
};


//Style
const SButton = styled.button`margin-left:16px`;
const SContainer = styled.div`
  border:solid 1px #ccc;
  padding:16px;
  margin:8px;
`;
const SMemoWrapper = styled.div`
  display:flex;
  aligin-items:center;
`;



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
