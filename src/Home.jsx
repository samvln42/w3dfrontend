import React from 'react'
import Header from './clients/components/Header/Header'
import Banner from './clients/components/Banner/Banner'
// import StoreList from './clients/pages/stores/StoreList'
// import ProductList from './clients/pages/products/ProductList'
import Mode3D from './clients/pages/Mode3D/Mode3D'

const Home = () => {
  return (
    <div>
      <Header />
      <main>
        <Banner />
        {/* <StoreList /> */}
        {/* <ProductList /> */}
        <Mode3D />
      </main>
    </div>

  )
}

export default Home
