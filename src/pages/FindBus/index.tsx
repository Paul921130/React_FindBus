import React, { useEffect } from 'react';

import logo from './logo.svg';
import './module.scss';
import { get_findBus, get_NearByStop, get_token } from '../API';

import { SearchOutlined } from '@ant-design/icons';
import { Button, DatePicker, Typography } from 'antd';

import 'antd/dist/antd.css';

//components
import Gmap from './components/Gmap';
import StopList from './components/StopList';
import ExampleComment from './components/Comments';

interface I_locat {
    lon?: number;
    lat?: number;
}
interface I_busStop {}
function FindBus() {
    const { Title } = Typography;
    const [locat, setLocat] = React.useState<I_locat>({});
    const [busStops, setBusStops] = React.useState<I_busStop[]>([]);
    //取得目前經緯度
    const get_locat = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('navigator', position.coords);
            setLocat({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
            });
        });
    };

    const clikc_searchBtn = () => {
        let NowCenter = window.gMap.getCenter().toJSON();
        setLocat({ lat: NowCenter.lat, lon: NowCenter.lng });
        console.log('NowCenter', NowCenter);
    };

    //call tdx的api
    async function set_findBus() {
        let token = await get_token();
        let findBus = await get_findBus(token);
        console.log('set_findBus', findBus);
    }
    //尋找附近公車站牌；set進state
    async function set_NearByStop() {
        let token = await get_token();
        let stops = await get_NearByStop(token, locat);
        // console.log('附近的公車站牌', stops);
        // stops = stops.map((child: any) => {
        //     return { ...child.BusPosition };
        // });
        console.log(stops);
        // setBusStops([...stops]);
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('navigator', position.coords);
            window.gMap.setZoom(17);
            window.gMap.setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        });
        //     set_findBus();
    }, []);

    useEffect(() => {}, [busStops]);

    //當位置有更動的時候就要get_NeatBy
    useEffect(() => {
        if (Object.keys(locat).length > 0) {
            set_NearByStop();
            window.gMap.setZoom(17);
            window.gMap.setCenter({ lat: locat.lat, lng: locat.lon });
        }
    }, [locat]);

    return (
        <div className="FindBus_Page">
            <div className="stops_box">
                <Title className="stops_box_title" level={5}>
                    公車站牌:
                </Title>
                <StopList />
            </div>
            <div className="map_box">
                <Button
                    className="button"
                    onClick={clikc_searchBtn}
                    type="primary"
                    shape="round"
                    icon={<SearchOutlined />}
                >
                    搜尋目前位置
                </Button>
                <Gmap urlParam="" />
            </div>
            <ExampleComment>
                <ExampleComment>
                    <ExampleComment />
                    <ExampleComment />
                </ExampleComment>
            </ExampleComment>
        </div>
    );
}

export default FindBus;
