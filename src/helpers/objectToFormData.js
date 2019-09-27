const isObject = value => value === Object(value);

const isArray = value => Array.isArray(value);

const isFile = value => value instanceof File;

function makeArrayKey(key) {
	if (key.length > 2 && key.lastIndexOf('[]') === key.length - 2) {
		return key;
	}
	return key + '[]';
}

export default function objectToFormData(obj, fd, pre) {
	fd = fd || new FormData();

	Object.keys(obj).forEach(prop => {
		const key = pre ? pre + '[' + prop + ']' : prop;

		if (obj[prop] === null) {
			return;
		}

		if (isObject(obj[prop]) && !isArray(obj[prop]) && !isFile(obj[prop])) {
			objectToFormData(obj[prop], fd, key);
		} else if (isArray(obj[prop])) {
			if (!obj[prop].length) {
				fd.append(key + '[]', '');
			}
			obj[prop].forEach(value => {
				const arrayKey = makeArrayKey(key);

				if (isObject(value) && !isFile(value)) {
					objectToFormData(value, fd, arrayKey);
				} else {
					fd.append(arrayKey, value);
				}
			});
		} else {
			fd.append(key, obj[prop]);
		}
	});

	return fd;
}
