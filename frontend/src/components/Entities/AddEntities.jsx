import { Route, Routes } from "react-router-dom"

export const AddEntities = ()=>{
    return(
        <div>
            <Routes>
                <Route path="/product" element={<AddProduct/>}/>
                <Route path="/brand" element={<AddBrand/>}/>
            </Routes>
        </div>


    )
}

export const AddProduct = ()=>{
    return (
        <div className="text-center">

            <h1> Add Product</h1>
            <h2>Coming Soon...</h2>

        </div>
    )
}

export const AddBrand = ()=>{
    return (
        <div className="text-center">

            <h1> Add Brand</h1>
            <h2>Coming Soon...</h2>

        </div>
    )
}


