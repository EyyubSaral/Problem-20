import axios from "axios";
import { useEffect, useState } from "react";

// Bu bileşen todo listesi oluşturur ve API'den alınan verileri görüntüler.
// Görevler:
// 1. useEffect hook'u kullanarak `https://jsonplaceholder.typicode.com/users/1/todos` API'sinden verileri alın ve bu verileri state içinde saklayın.
// 2. Alınan verileri Todo bileşenine props olarak aktararak her bir todo öğesini liste halinde görüntüleyin.
// 3. Her todo için şu bilgileri gösterin:
//    - Başlık (title)
//    - Tamamlanma durumu (completed, checkbox olarak gösterilmeli)
// 4. Checkbox işaretlendiğinde veya kaldırıldığında, o todo'nun tamamlanma durumunu state'de güncelleyin (UI'da hemen güncellenmeli).

// Bonus:
// - "Yapılacaklar Listem" başlığının altına, toplam todo sayısını ve tamamlanmış olan todo sayısını gösterin (örneğin, "Toplam: 10, Tamamlanmış: 3").
// - Todo listesini alfabetik sıraya veya tamamlanma durumuna göre sıralamak için bir dropdown ekleyin.
// - Kullanıcı listeye yeni bir todo ekleyebilsin. Yeni eklenen todo, otomatik olarak "tamamlanmamış" durumunda ve geçici ID ile eklenmelidir.
// - API'den veri alınırken yükleniyor durumu (Loading...) ve hata durumu (Hata oluştu.) ekleyin.

// Tailwind ile ilgili istekler:
// 1. Todo öğeleri için daha belirgin kart tasarımı oluşturun (örneğin, shadow, border, ve rounded-md class'larını kullanarak).
// 2. Tamamlanmış todo öğelerinin başlıklarına vurgu ekleyin (örneğin, line-through ve text-gray-500).
// 3. "Yapılacaklar Listem" başlığını ve sayaçları farklı bir arka plan ve yazı stiliyle vurgulayın.
// 4. Checkbox hover edildiğinde, kutunun kenar rengini değiştiren bir animasyon ekleyin.
// 5. Mobil cihazlar için listeyi daha kompakt bir düzene göre optimize edin (örneğin, küçük yazı tipi boyutları ve dar kenar boşlukları).

export default function Todos() {
  const [todoList, setTodoList] = useState(null);
  const [completed, setCompleted] = useState(0);

  const checkBoxChange = (id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const updatedTodo = todoList.find((todo) => id === todo.id);
    if (updatedTodo) {
      if (!updatedTodo.completed) {
        setCompleted((prev) => prev + 1);
      } else setCompleted((prev) => prev + -1);
    }
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((res) => setTodoList(res.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(todoList);

  return (
    <div className="flex justify-center flex-col items-center py-8 sm:py-4">
      <h1 className="text-2xl font-bold pb-4 sm:text-lg sm:pb-2">
        Yapılacaklar Listem
      </h1>
      <h2 className="bg-emerald-300 rounded p-2 hover:bg-emerald-400 m-2">
        Toplam:{todoList && todoList.length}{" "}
      </h2>
      <h2 className="bg-emerald-300 rounded p-2 hover:bg-emerald-400 m-2">
        Tamamlanan: {completed}
      </h2>
      <div className="space-y-5 sm:space-y-3">
        {todoList
          ? todoList.map((list) => {
              return (
                <Todo
                  key={list.id}
                  todo={list}
                  checkBoxChange={checkBoxChange}
                />
              );
            })
          : "...Loading"}
      </div>
    </div>
  );
}

function Todo({ todo, checkBoxChange }) {
  const handleCheckBoxChange = () => {
    checkBoxChange(todo.id);
  };
  return (
    <div className="relative flex items-start  border  bg-gray-400 hover:bg-gray-500 hover:border-black shadow-lg m-3 p-2 sm:m-2 sm:p-1">
      <div className="flex h-6 items-center ">
        <input
          onChange={handleCheckBoxChange}
          id="completed"
          name="completed"
          type="checkbox"
          defaultChecked={false}
          className="h-4 w-4 sm:h-3 sm:w-3 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6 sm:text-xs sm:leading-5">
        <div
          className={`font-medium text-gray-900 ${
            todo.completed ? "line-through text-gray-600 " : null
          }`}
        >
          {todo.title}
        </div>
      </div>
    </div>
  );
}
