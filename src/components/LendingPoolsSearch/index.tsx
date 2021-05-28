import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { LendingPoolsTable } from './../LendingPoolsTable';
import { PAGES } from 'utils/constants/links';

export function SearchForm(): JSX.Element {
  return (
    <InputGroup>
      <FormControl placeholder='Search pair by name or address' />
      <InputGroup.Append>
        <Button variant='primary'>Search</Button>
      </InputGroup.Append>
      <a href={PAGES.createNewPair.to}>
        <Button>{PAGES.createNewPair.value}</Button>
      </a>
    </InputGroup>
  );
}

/**
 * Creates a searchable list of Lending Pools.
 */

export default function LendingPoolsSearch(): JSX.Element {
  return (
    <div className='my-8'>
      <Container>
        <Row>
          <Col sm={12}>
            <Card className='overflow-hidden'>
              <Card.Body>
                {/* <SearchForm />*/}
                <LendingPoolsTable />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
