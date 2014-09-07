# Copyright (c) 2011-2014 Berkeley Model United Nations. All rights reserved.
# Use of this source code is governed by a BSD License (see LICENSE).

from rest_framework.serializers import DecimalField as FrameworkDecimalField


class DecimalField(FrameworkDecimalField):
    '''Extension of DRF's DecimalField that serializes a Decimal as a float.'''

    def to_native(self, obj):
        return float(obj)
