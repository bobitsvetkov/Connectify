
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ChannelList({ teamId, channels }) {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);

    const handleChannelClick = (channel) => {
        navigate(`/${teamId}/${channel.name}`);
    };

    const handleTransitionEnd = () => {
        if (!isOpen) {
            setIsOpen(true);
        }
    };
    return (
        <div
            className={`user-list ${isOpen ? "open" : "closed"}`}
            onTransitionEnd={handleTransitionEnd}
        >
            {isOpen && (
                <>
                    <h2>Channels</h2>
                    <ul>
                        {Object.values(channels).map((channel, index) => (
                            <li
                                key={index}
                                onClick={() => handleChannelClick(channel)}
                                style={{ cursor: "pointer" }}
                            >
                                {channel.name}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}

export default ChannelList;