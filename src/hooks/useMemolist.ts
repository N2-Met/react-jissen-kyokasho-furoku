import { useCallback, useState } from "react";

//メモ一覧に対するカスタムフック
export const useMemoList = () => {
    //メモ一覧State
    const [memos, SetMemos] = useState<string[]>([]);

    //メモ追加ロジック
    const addTodo = useCallback((text: string) => {
        //State変更を正常に検知させるため、新たな配列を生成
        const newMemos = [...memos];

        //ﾃｷｽﾄﾎﾞｯｸｽの入力内容をメモ配列に追加
        newMemos.push(text);
        SetMemos(newMemos);

        //依存関係を忘れずにmemosを設定
    }, [memos]);

    //メモ削除ロジック
    const deleteTodo = useCallback((index: number) => {
        //State変更を正常に検知させるため新たな配列を生成
        const newMemos = [...memos];

        //メモ配列から該当の要素を削除
        newMemos.splice(index, 1);
        SetMemos(newMemos);
    }, [memos]);

    return { memos, addTodo, deleteTodo };
};
