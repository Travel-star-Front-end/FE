import { useState, useEffect } from "react";
import LoadingModal from "./loadingModal";
import FeelingModal from "./feelingModal";

const AIModal = ({ onClose, analyzedFeeling, onFeelingSelect }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return loading ? (
        <LoadingModal onClose={onClose} />
    ) : (
        <FeelingModal onClose={onClose} analyzedFeeling={analyzedFeeling} onFeelingSelect={onFeelingSelect} />
    );
};

export default AIModal;
