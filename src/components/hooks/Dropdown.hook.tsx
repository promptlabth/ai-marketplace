import { useState, useRef, useEffect } from 'react';

interface FrameworkDetail {
    framework: string;
    detail: string;
    component: Array<{
        type: string;
        label: string;
        role?: string[];
    }>;
}

const useDropdown = (data: FrameworkDetail[], Json_data: string) => {
    const [isOpen, setIsOpen] = useState(false);
    const [nameList, setNameList] = useState("Select Role");
    const toggleRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target as Node) &&
            toggleRef.current &&
            !toggleRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const [selectedFrameworkDetails, setSelectedFrameworkDetails] = useState<FrameworkDetail | null>(null);

    useEffect(() => {
        const frameworkDetails = data.find(f => f.framework === Json_data);
        if (frameworkDetails) {
            setSelectedFrameworkDetails(frameworkDetails);
        }
    }, [Json_data, data]);

    return {
        DropdownItems: {
            isOpen, setIsOpen, nameList, setNameList, toggleRef, dropdownRef, selectedFrameworkDetails
        }
    };
};

export default useDropdown;