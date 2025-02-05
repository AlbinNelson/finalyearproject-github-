import React from 'react'

import { Funnel } from '@prisma/client'
import { db } from '@/lib/db'

import FunnelForm from '@/components/forms/funnel-form'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import FunnelProductsTable from './funnel-products-table'

// Generic mock function to fetch products
const fetchProducts = async () => {
  return [
    {
      id: 'prod_1',
      name: 'Product 1',
      images: ['/path/to/image1.jpg'],
      defaultPrice: {
        id: 'price_1',
        recurring: false,
        unitAmount: 1000,
      },
    },
    {
      id: 'prod_2',
      name: 'Product 2',
      images: ['/path/to/image2.jpg'],
      defaultPrice: {
        id: 'price_2',
        recurring: true,
        unitAmount: 2000,
      },
    },
  ]
}

interface FunnelSettingsProps {
  subaccountId: string
  defaultData: Funnel
}

const FunnelSettings: React.FC<FunnelSettingsProps> = async ({
  subaccountId,
  defaultData,
}) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: subaccountId,
    },
  })

  if (!subaccountDetails) return null

  // Fetch products using the mock function
  const products = await fetchProducts()

  return (
    <div className="flex gap-4 flex-col xl:!flex-row">
      <Card className="flex-1 flex-shrink">
        <CardHeader>
          <CardTitle>Funnel Products</CardTitle>
          <CardDescription>
            Select the products and services you wish to sell on this funnel.
            You can sell one-time and recurring products too.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <>
            {products.length > 0 ? (
              <FunnelProductsTable
                defaultData={defaultData}
                products={products}
              />
            ) : (
              'No products available.'
            )}
          </>
        </CardContent>
      </Card>

      <FunnelForm subAccountId={subaccountId} defaultData={defaultData} />
    </div>
  )
}

export default FunnelSettings
