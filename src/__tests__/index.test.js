import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DialogComponent from '../core/ui/Dialog';

test('reporting period dialog UI', async () => {
  const declareProperties = {
    reportingPeriod: '11002',
    isDeclareBusinessTax: true,
  };
  const open = true;

  const handleSelectionChange = jest.fn();
  const handleClose = jest.fn();
  const onScan = jest.fn();
  const handleReset = jest.fn();

  render(
    <DialogComponent
      handleSelectionChange={handleSelectionChange}
      handleClose={handleClose}
      handleReset={handleReset}
      onConfirm={onScan}
      declareProperties={declareProperties}
      open={open}
    />,
  );

  userEvent.click(screen.getByText(declareProperties.reportingPeriod));
  userEvent.click(screen.getByText('11004'));
  expect(handleSelectionChange).toHaveBeenCalledTimes(1);

  userEvent.click(screen.getByText('確認'));
  expect(onScan).toHaveBeenCalledTimes(1);

  userEvent.click(screen.getByText('取消'));
  expect(handleReset).toHaveBeenCalledTimes(1);
  expect(handleClose).toHaveBeenCalledTimes(2);
});
