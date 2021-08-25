import React from 'react'
import Layout from '../components/layout'
import { fetchAPI } from '../lib/api'
import nookies from 'nookies'
import Seo from '../components/seo'
import Router from 'next/router'

const Dashboard = ({homepage, ...props}) => {

  const handleLogout = () => {
    nookies.destroy(null, 'uat')
    Router.replace('/admin')
  }

  return (
    <Layout>
      <Seo seo={homepage.seo}/>
      <div className="flex justify-center items-center flex-col my-auto gap-2">
        <h1 className="text-4xl text-gray-200 font-bold">Dashboard</h1>
        <div className="p-3 bg-gray-200 text-base rounded-xl font-semibold" onClick={handleLogout}>Sign out</div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(ctx){
  const homepage = await fetchAPI("/homepage")
  const cookies = nookies.get(ctx)

  if(!cookies.uat){
    return {
      redirect: {
        destination: '/admin'
      }
    }
  }

  return {
    props: { homepage },
  }
}

export default Dashboard
