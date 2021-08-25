import React, { useState } from 'react'
import Footer from '../components/footer'
import Layout from '../components/layout'
import Login from '../components/login'
import Register from '../components/register'
import Seo from '../components/seo'
import ToggleRegLog from '../components/toggleRegLog'
import { fetchAPI } from '../lib/api'
import nookies from 'nookies'
import { useRouter } from 'next/router'

const AdminPage = (props) => {

  const [enabled, setEnabled] = useState(false)

  return (
    <Layout>
      <Seo seo={props.homepage.seo}/>
      {enabled ? 
        <Register />
      :
        <Login />
      }
      {/* <ToggleRegLog setEnabled={setEnabled} enabled={enabled} /> */}
      <Footer />
    </Layout>
  )
}

// export async function getStaticProps() {
//   // Run API calls in parallel
//   const homepage = await fetchAPI("/homepage")

//   return {
//     props: { homepage },
//     revalidate: 1,
//   };
// }

export async function getServerSideProps(ctx){
  const homepage = await fetchAPI("/homepage")
  const cookies = nookies.get(ctx)

  if(cookies.uat){
    return {
      redirect: {
        destination: '/dashboard'
      }
    }
  }

  return {
    props: { homepage },
  }
}

export default AdminPage
