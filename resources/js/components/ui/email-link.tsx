import { cn } from "@/lib/utils";

interface EmailLinkProps {
    email: string;
    className?: string;
    subject?: string;
    body?: string;
    children: React.ReactNode;
}

const EmailLink: React.FC<EmailLinkProps> = ({ email, className = '', subject = '', body = '', children }) => {
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    return (
        <a href={mailtoLink} className={cn('text-teal-800 hover:underline', className)}>
            {children}
        </a>
    );
};

export default EmailLink;
