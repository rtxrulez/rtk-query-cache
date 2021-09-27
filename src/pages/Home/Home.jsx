import React, { useState } from "react"
import {
  useGetGoodsQuery,
  useAddProductMutation,
  useDeleteProductMutation
} from "../../store/rtk"

export const Home = () => {
  const [count, setCount] = useState("")
  const [newProduct, setNewProduct] = useState("")
  const { data = [], isLoading } = useGetGoodsQuery(count)
  const [setProduct, { isError }] = useAddProductMutation()
  const [deleteProduct] = useDeleteProductMutation()

  const handleAddProduct = async () => {
    if (newProduct) {
      await setProduct({ name: newProduct }).unwrap()
      setNewProduct("")
    }
  }

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap()
  }

  if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={handleAddProduct}>add</button>
      </div>
      <select value={count} onChange={(e) => setCount(e.target.value)}>
        <option value="''">all</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <h1>List</h1>
      <ul>
        {data.map((item) => {
          return (
            <li key={item.id} onClick={() => handleDeleteProduct(item.id)}>
              {item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
