import Button from "./components/Button";
import Modal from "./components/modal/Modal";
import { prisma } from "./config/prisma";

// const data = [
//   { id: 1, title: "iphone", description: "jak;jf;kajkf;", price: "24543" },
//   { id: 1, title: "iphone", description: "jak;jf;kajkf;", price: "24543" },
//   { id: 1, title: "iphone", description: "jak;jf;kajkf;", price: "24543" },
//   { id: 1, title: "iphone", description: "jak;jf;kajkf;", price: "24543" },
// ];
const fetchProducts = async () => {
  try {
    const allProducts = await prisma.products.findMany();
    return allProducts;
  } catch (error) {
    console.log("error while fetching products", error);
  }
};
export default async function Home() {
  const Products = await fetchProducts();
  return (
    <div className="p-4 relative">
      <h1 className="py-4 px-2 text-2xl font-bold bg-red-300">Header</h1>

      <div className="my-8">
        <Modal title="Add Products" />
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Description</th>
            <th className="py-3 px-6 text-left">Price</th>
            <th className="py-3 px-6 text-left">Update</th>
            <th className="py-3 px-6 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {Products?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap ">
                {item.id.slice(0, 5)}...
              </td>
              <td className="py-3 px-6 text-left ">{item.title}</td>
              <td className="py-3 px-6 text-left ">{item.description}</td>
              <td className="py-3 px-6 text-left ">{item.price} Rs</td>
              <td className="py-3 px-6 text-left ">
                <Modal
                  products={{
                    id: item.id,
                    title: item.title,
                    descrition: item.description,
                    price: item.price,
                  }}
                  isUpdate={true}
                  title="Update"
                />
              </td>

              <td className="py-3 px-6 text-left ">
                <Button id={item.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
