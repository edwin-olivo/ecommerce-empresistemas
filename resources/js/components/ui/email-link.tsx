import { cn } from "@/lib/utils";
import { Mail } from 'lucide-react';

export interface EmailLinkProps {
    email: string;
    className?: string;
    subject?: string;
    body?: string;
    children?: React.ReactNode;
    variant?: 'default' | 'inline' | 'button' | 'card';
    showIcon?: boolean;
    iconPosition?: 'left' | 'right';
    title?: string;
}

const EmailLink: React.FC<EmailLinkProps> = ({
    email,
    className = '',
    subject = '',
    body = '',
    children,
    variant = 'default',
    showIcon = false,
    iconPosition = 'left',
    title
}) => {
    const mailtoLink = `mailto:${email}${subject || body ? '?' : ''}${subject ? `subject=${encodeURIComponent(subject)}` : ''}${subject && body ? '&' : ''}${body ? `body=${encodeURIComponent(body)}` : ''}`;

    const baseStyles = 'transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900';

    const variantStyles = {
        default: 'text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300',
        inline: 'font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 break-all',
        button: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
        card: 'inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-900 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30 border border-blue-200 dark:border-blue-800/50'
    };

    const iconStyles = 'h-4 w-4';

    const displayText = children || email;
    const displayTitle = title || `Contactar a ${email}`;

    const iconComponent = showIcon && (
        <Mail className={cn(iconStyles, 'flex-shrink-0')} />
    );

    return (
        <a
            href={mailtoLink}
            className={cn(baseStyles, variantStyles[variant], className)}
            title={displayTitle}
        >
            {showIcon && iconPosition === 'left' && iconComponent}
            {displayText}
            {showIcon && iconPosition === 'right' && iconComponent}
        </a>
    );
};

export default EmailLink;
