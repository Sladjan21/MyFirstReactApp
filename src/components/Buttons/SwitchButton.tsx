import React from 'react';
import Form from 'react-bootstrap/Form';

export default function Button(data: any) {
  return (
    <Form>
      <Form.Check
        type="switch"
        id="custom-switch"
        label={data.message}
        onClick={data.func}
      />
    </Form>
  );
}
