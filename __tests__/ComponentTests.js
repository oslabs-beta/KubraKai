import subject from '../client/components/ipInput'

describe('React unit tests', () => {
    describe('ipInput', () => {
        beforeAll(() => {
            let data = {
                ipArray: [],
                setipArray: (newArr) => {
                   data.ipArray = newArr;
                   return data
                }
            }
        })
    
        it('Renders a <Button> with the label in Aria', () => {
            expect(subject()).toEqual(true);
        }) 
    });
});