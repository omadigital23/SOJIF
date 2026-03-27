import { render, screen } from '@testing-library/react';
import Footer from '@/components/layout/Footer';

describe('Footer Component', () => {
    it('renders without crashing', () => {
        render(<Footer />);
        expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('contains copyright text', () => {
        render(<Footer />);
        expect(screen.getByText(/© 2026 SOJIF Consulting/i)).toBeInTheDocument();
    });

    it('contains contact links', () => {
        render(<Footer />);
        expect(screen.getByText(/contact/i)).toBeInTheDocument();
    });
});
