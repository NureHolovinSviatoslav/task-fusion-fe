import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ListItem } from '../common/ListItem';

describe('ListItem Component', () => {
    it('renders correctly with column type', () => {
        const data = [<p key="1">Data 1</p>, <p key="2">Data 2</p>];
        render(<ListItem title="Test Title" data={data} type="column" />);

        // Check title
        expect(screen.getByText('Test Title')).toBeInTheDocument();

        // Check column data rendering
        expect(screen.getByText('Data 1')).toBeInTheDocument();
        expect(screen.getByText('Data 2')).toBeInTheDocument();

        // Check if the wrapper has column styles
        const wrapper = screen.getByText('Test Title').closest('div');
        expect(wrapper).toHaveClass('columnWrapper');
    });

    it('renders correctly with row type', () => {
        const data = [<p key="1">Row Data 1</p>, <p key="2">Row Data 2</p>];
        render(<ListItem title="Row Test Title" data={data} type="row" right={<span>Right Element</span>} />);

        // Check title
        expect(screen.getByText('Row Test Title')).toBeInTheDocument();

        // Check row data rendering
        expect(screen.getByText('Row Data 1')).toBeInTheDocument();
        expect(screen.getByText('Row Data 2')).toBeInTheDocument();

        // Check right element is rendered
        expect(screen.getByText('Right Element')).toBeInTheDocument();

        // Check if the wrapper has row styles
        const wrapper = screen.getByText('Row Test Title').closest('div');
        expect(wrapper).toHaveClass('rowWrapper');
    });

    it('renders a link if href is provided', () => {
        const data = [<p key="1">Link Data</p>];
        render(<ListItem title="Link Test Title" data={data} href="/test" />);

        // Check if the component renders a link
        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/test');

        // Check content inside the link
        expect(screen.getByText('Link Data')).toBeInTheDocument();
    });

    it('does not render a link if no href is provided', () => {
        const data = [<p key="1">Non-Link Data</p>];
        render(<ListItem title="No Link Test" data={data} />);

        // Ensure no link is rendered
        const link = screen.queryByRole('link');
        expect(link).toBeNull();
    });
});
