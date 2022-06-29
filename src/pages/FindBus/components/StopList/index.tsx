import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface UserItem {
    email: string;
    gender: string;
    name: {
        first: string;
        last: string;
        title: string;
    };
    nat: string;
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
}

const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 900;

const StopList: React.FC = () => {
    const [data, setData] = useState<UserItem[]>([]);

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                // console.log(body.results);
                setData(data.concat(body.results));
                // message.success(`${body.results.length} more items loaded!`);
            });
    };

    useEffect(() => {
        appendData();
    }, []);

    // const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    //     if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
    //         appendData();
    //     }
    // };

    return (
        <List>
            <VirtualList
                data={data}
                // height={ContainerHeight}
                itemHeight={47}
                itemKey="email"
                // onScroll={onScroll}
            >
                {(item: UserItem) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<Link to="/findbus?id=222">{item.name.last}</Link>}
                        />
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};

export default StopList;
