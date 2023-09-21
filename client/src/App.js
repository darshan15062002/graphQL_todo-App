
import { gql, useQuery } from '@apollo/client'

const query = gql`
query ExampleQuery {
  getAllTodos {
         id
         title
         completed
         user{
             name
             email
             }

 }

}`;


function App() {

  const { loading, error, data } = useQuery(query)
  console.log(data);

  return (
    <div className="App">
      <table>
        {data?.getAllTodos.map((item) => (
          <tr>
            <td>{item.title}</td><td> {item.user?.name}</td>

          </tr>
        ))}

      </table>
    </div>
  );
}

export default App;
