import { ChartComponent } from '@/pages/home/chart';
import ProfileCard from '@/pages/home/profile-card.tsx';
import { basicAxios } from '@/services/basicAxios';
import { DataTable } from './data-table/holding-table';
import { columns } from './data-table/columns';
import { _Holding } from '@/types';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader';
import { PlaceOrderForm } from './place-order-form';
import { API_ENDPOINTS } from '@/const';
import PnlCard from './pnl-card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import LiveNifty from './live-nifty';



const Homepage = () => {
  const navigate = useNavigate();

  const [holdings, setHoldings] = useState<_Holding[]>([]);
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [totalPnl, setTotalPnl] = useState<number>(0);
  const [totall, setTotall] = useState<number>(0);
  const [totalp, setTotalP] = useState<number>(0);

  const checkAuth = async () => {
    console.log('Checking auth');
    try{
    await basicAxios(API_ENDPOINTS.STATUS, undefined, undefined, 'GET');
    } catch (error) {
      navigate('/login');
    }
  }

  useEffect(() => {

    checkAuth();
    const fetchHoldings = async () => {
      setTableLoading(true);
      const res = await basicAxios(API_ENDPOINTS.HOLDINGS, undefined, undefined, 'GET');
      setHoldings(res.data);

      setTotalPnl(res.data.reduce((acc: number, curr: _Holding) => acc + curr.pnl, 0));
      setTotalP(res.data.reduce((acc: number, curr: _Holding) => acc + (curr.pnl > 0 ? curr.pnl : 0), 0));
      setTotall(res.data.reduce((acc: number, curr: _Holding) => acc + (curr.pnl < 0 ? curr.pnl : 0), 0));

      setTableLoading(false);
    }
    fetchHoldings();
  }, [])

  return (
    <div className='bg-black min-h-screen p-8 '>
      <div className='container mx-auto '>
        <div className='flex justify-end '>
          <Button variant="outline" className='text-white m-2 rounded-xl' onClick={(e) => { localStorage.removeItem('access_token'); navigate('/login') }}>Logout</Button>
        </div>
        <div>
          <ChartComponent />
          <div className='flex flex-row w-full justify-between'>
            <ProfileCard />

            <PnlCard initialNumber={totalPnl} header={"Total:"} />
            <PnlCard initialNumber={totalp} header={"Profit:"} />
            <PnlCard initialNumber={totall} header={"Loss:"} />
            <LiveNifty />
          </div>
          {tableLoading ? <Loader /> :
            <DataTable columns={columns} data={holdings} />
          }
          <div className='justify-center w-full flex'>      
            <PlaceOrderForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
