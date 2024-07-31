import React from 'react';
import ReactLoading from 'react-loading';
import { create } from 'react-test-renderer';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, jest, expect, beforeEach } from '@jest/globals'; // Import only what you need
import Form from '../../../components/Form/Form';

const mockSendItem = jest.fn();
const mockSetItem = jest.fn();
const mockSetValor = jest.fn();

describe('Form Component', () => {
 
    test('calls sendItem function on form submit', () => {
        const component = create(
            <Form
                sendItem={mockSendItem}
                setItem={mockSetItem}
                setValor={mockSetValor}
                className="test-class"
                item=""
                valor=""
                loading={false}
            />
        );

        const instance = component.root;
        const form = instance.findByType('form');

        form.props.onSubmit({ preventDefault: jest.fn() });
        expect(mockSendItem).toHaveBeenCalled();
    });
    test('clearInputs validate', () => {
        const component = create(
            <Form
                sendItem={mockSendItem}
                setItem={mockSetItem}
                setValor={mockSetValor}
                className="test-class"
                item=""
                valor=""
                loading={false}
            />
        );
        const instance = component.root;
        const clearButton = instance.findAllByType('button').find(button => button.props.children === 'Limpar');
        clearButton.props.onClick({ preventDefault: jest.fn() });

        expect(mockSetItem).toHaveBeenCalledWith('');
        expect(mockSetValor).toHaveBeenCalledWith('');
    });

    test('onChange item value', () => {
        const component = create(
            <Form
                sendItem={mockSendItem}
                setItem={mockSetItem}
                setValor={mockSetValor}
                className="test-class"
                item=""
                valor=""
                loading={false}
            />
        );
        const instance = component.root;
        const clearButton = instance.findAllByType('input').find(button => button.props.id === 'item-input');
        clearButton.props.onChange({ target: { value: 'new item' } });
        expect(mockSetItem).toHaveBeenCalledWith('new item');
    });

    test('onChange value price', () => {
        const component = create(
            <Form
                sendItem={mockSendItem}
                setItem={mockSetItem}
                setValor={mockSetValor}
                className="test-class"
                item=""
                valor=""
                loading={false}
            />
        );
        const instance = component.root;
        const valorInput = instance.findAllByType('input').find(input => input.props.type === 'number');
        valorInput.props.onChange({ target: { value: '123' } });
        expect(mockSetValor).toHaveBeenCalledWith('123');
    });

    test('matches the snapshot', () => {
        const component = create(
            <Form
                sendItem={mockSendItem}
                setItem={mockSetItem}
                setValor={mockSetValor}
                className="test-class"
                item=""
                valor=""
                loading={true}
            />
        );
        const instance = component.root;
        const button = instance.findAllByType('button').find(btn => btn.props.className === 'box-form__button');
        expect(button.props.disabled).toBe(true);
        const loadingSpinner = instance.findAllByType(ReactLoading);
        expect(loadingSpinner.length).toBeGreaterThan(0);;
    });

})