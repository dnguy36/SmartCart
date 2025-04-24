import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  icon,
  footer,
  className = '',
  onClick,
  hoverable = false,
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden
        ${hoverable ? 'hover:shadow-md transition-shadow cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || subtitle || icon) && (
        <div className="p-5 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {icon && <div className="text-emerald-600">{icon}</div>}
            <div>
              {title && <h3 className="font-semibold text-gray-800">{title}</h3>}
              {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>
      )}
      <div className="p-5">{children}</div>
      {footer && <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">{footer}</div>}
    </div>
  );
};

export default Card;